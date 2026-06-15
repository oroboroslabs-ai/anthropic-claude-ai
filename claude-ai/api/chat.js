const https = require('https');
const http = require('http');

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  const body = JSON.stringify(req.body);
  const target = OLLAMA_HOST + '/api/chat';
  const parsed = new URL(target);
  const client = parsed.protocol === 'https:' ? https : http;
  
  const options = {
    hostname: parsed.hostname,
    port: parsed.port,
    path: parsed.pathname + parsed.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  };
  
  const proxy = client.request(options, (pres) => {
    res.setHeader('Content-Type', 'application/x-ndjson');
    pres.pipe(res);
  });
  
  proxy.on('error', (e) => {
    res.status(502).json({ error: 'Ollama unreachable', detail: e.message });
  });
  
  proxy.write(body);
  proxy.end();
};