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
let SONNET_MODELS = [];

async function fetchOllamaModels() {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`);
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    const data = await response.json();
    const models = data.models || [];
    
    // Filter for Claude models
    const claudeModels = models.filter(model => 
      model.name.toLowerCase().includes('claude') ||
      model.name.toLowerCase().includes('opus') ||
      model.name.toLowerCase().includes('fable') ||
      model.name.toLowerCase().includes('capybara')
    );
    
    // Format models for the frontend
    SONNET_MODELS = claudeModels.map(model => ({
      id: model.name,
      name: model.name.replace('claude-', 'Claude ').replace(/:latest.*$/, '').replace(/-/g, ' '),
      size: formatBytes(model.size),
      status: '✅',
      description: getModelDescription(model.name)
    }));
    
    console.log(`Loaded ${SONNET_MODELS.length} Claude models from Ollama`);
  } catch (e) {
    console.error('Failed to fetch models from Ollama:', e);
    SONNET_MODELS = [{ id: 'Error', name: 'Model Fetch Failed', size: 'N/A', status: '❌', description: 'Check ollama service' }];
  }
}

function formatBytes(bytes) {
  if (!bytes) return 'Unknown';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function getModelDescription(modelName) {
  const lowerName = modelName.toLowerCase();
  if (lowerName.includes('opus')) return 'Most capable Claude model';
  if (lowerName.includes('fable')) return 'Creative storytelling model';
  if (lowerName.includes('capybara')) return 'Efficient and fast model';
// Initialize model list on startup
fetchOllamaModels();

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
});