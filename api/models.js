const SONNET_MODELS = [
  { id: 'claude-sonnet-4-6:latest', name: 'Claude Sonnet 4.6', size: '9.6GB', status: '✅', description: 'Latest Sonnet - Recommended' },
  { id: 'claude-sonnet-4:latest', name: 'Claude Sonnet 4', size: '9.6GB', status: '✅', description: 'Stable Sonnet' },
  { id: 'oroboroslabs/claude-sonnet-4:latest', name: 'Claude Sonnet 4 (OroborosLabs)', size: '9.6GB', status: '✅', description: 'Enhanced Sonnet' },
  { id: 'claude-sonnet-3.5:latest', name: 'Claude Sonnet 3.5', size: '9.6GB', status: '✅', description: 'Previous Generation' }
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json({ models: SONNET_MODELS });
};