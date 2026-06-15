const https = require('https');
const http = require('http');

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }
  
  // Vercel auto-parses JSON body
  const body = req.body;
  const bodyStr = JSON.stringify(body);
  const target = OLLAMA_HOST + '/api/chat';
  const parsed = new URL(target);
  const client = parsed.protocol === 'https:' ? https : http;
  
  const options = {
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
    path: parsed.pathname + parsed.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bodyStr)
    },
    rejectUnauthorized: false
  };
  
  const proxy = client.request(options, (pres) => {
    res.statusCode = pres.statusCode;
    res.setHeader('Content-Type', pres.headers['content-type'] || 'application/x-ndjson');
    pres.pipe(res);
  });
  
  proxy.on('error', (e) => {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Ollama unreachable', detail: e.message }));
  });
  
  proxy.write(bodyStr);
  proxy.end();
};