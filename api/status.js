module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Claude AI Sonnet Models',
    models: 4,
    ollama: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434'
  });
};