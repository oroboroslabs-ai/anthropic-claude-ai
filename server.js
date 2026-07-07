const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8788;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Claude Sonnet Models Configuration
const SONNET_MODELS = [
  { id: 'sonnet_5:latest', name: 'Claude Sonnet 5', size: '5.0GB', status: '✅', description: 'Triple-encrypted, 48 strata active' },
  { id: 'claude-sonnet-4-6:latest', name: 'Claude Sonnet 4.6', size: '9.6GB', status: '✅', description: 'Latest Sonnet - Recommended' },
  { id: 'claude-sonnet-4:latest', name: 'Claude Sonnet 4', size: '9.6GB', status: '✅', description: 'Stable Sonnet' },
  { id: 'oroboroslabs/claude-sonnet-4:latest', name: 'Claude Sonnet 4 (OroborosLabs)', size: '9.6GB', status: '✅', description: 'Enhanced Sonnet' },
  { id: 'claude-sonnet-3.5:latest', name: 'Claude Sonnet 3.5', size: '9.6GB', status: '✅', description: 'Previous Generation' }
];

function corsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function proxyToOllama(req, res, body) {
  const target = OLLAMA_HOST + req.url;
  const parsed = new URL(target);
  const client = parsed.protocol === 'https:' ? https : http;
  
  const options = {
    hostname: parsed.hostname,
    port: parsed.port,
    path: parsed.pathname + parsed.search,
    method: req.method,
    headers: { 'Content-Type': req.headers['content-type'] || 'application/json' }
  };
  
  const proxy = client.request(options, (pres) => {
    corsHeaders(res);
    res.writeHead(pres.statusCode, { 'Content-Type': 'application/json' });
    pres.pipe(res);
  });
  
  proxy.on('error', (e) => {
    res.writeHead(502);
    res.end(JSON.stringify({ error: 'Ollama unreachable', detail: e.message }));
  });
  
  if (body) proxy.write(body);
  proxy.end();
}

const server = http.createServer((req, res) => {
  corsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // API Routes
  if (req.url === '/api/models') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ models: SONNET_MODELS }));
    return;
  }
  
  if (req.url === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'online', 
      timestamp: new Date().toISOString(),
      ollama: OLLAMA_HOST 
    }));
    return;
  }
  
  // Proxy to Ollama
  if (req.url.startsWith('/api/')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => proxyToOllama(req, res, body));
    return;
  }
  
  // Serve static files
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    
    const contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════════════════════════════╗`);
  console.log(`║   Claude AI Model Chat - Sonnet Interface               ║`);
  console.log(`╠══════════════════════════════════════════════════════════╣`);
  console.log(`║   Server: http://127.0.0.1:${PORT}                        ║`);
  console.log(`║   Ollama: ${OLLAMA_HOST.padEnd(47)}║`);
  console.log(`║   Models: ${SONNET_MODELS.length} Sonnet Models Available              ║`);
  console.log(`╚══════════════════════════════════════════════════════════╝\n`);
});