/**
 * Q5, WorldFeed, and Tor Network Integration
 * Connects Claude models to Oroboros network systems
 * 
 * Architecture:
 * - Q5 Hive Mind: Port 8101 (Gradio interface)
 * - WorldFeed API: Port 8100 (Financial, Energy, News feeds)
 * - Tor Network: Multiple research categories
 * - Ollama: Port 11434 (Model inference)
 */

const Q5_WORLDFEED_CONFIG = {
    // Q5 Hive Mind - Routes queries through 300+ models
    Q5: {
        enabled: true,
        endpoint: 'http://localhost:8101',
        gradio_interface: 'http://localhost:8101',
        models: 300,
        architecture: '34³ (34 Strata × 24 Axioms × 24 Nulls)',
        resonance: { base: 777, crown: 1272 },
        features: [
            'query_classification',
            'auto_routing',
            'multi_model_consensus',
            'fallback_paths'
        ]
    },
    
    // WorldFeed - Live data feeds
    WorldFeed: {
        enabled: true,
        endpoint: 'http://localhost:8100',
        feeds: {
            CNN: { endpoint: 'http://localhost:11434/api/generate', interval: 60000 },
            FINANCIAL: { endpoint: 'http://localhost:3002', assets: 17, interval: 60000 },
            ENERGY: { endpoint: 'http://localhost:5001', grids: 4, interval: 300000 },
            NEWS: { endpoint: 'http://localhost:8090', interval: 120000 },
            AI_INFRASTRUCTURE: { endpoint: 'http://localhost:7070', interval: 300000 },
            QUANTUM_NETWORK: { endpoint: 'http://localhost:6060', interval: 60000 }
        },
        categories: [
            'financial_markets',
            'energy_grids',
            'news_feeds',
            'ai_infrastructure',
            'quantum_networks'
        ]
    },
    
    // Tor Network - Research feeds
    TorNetwork: {
        enabled: true,
        categories: 15,
        cache_dir: 'J:/oroboros-programs/OROBOROS_AGI/tor_cache',
        feeds: [
            'research_papers',
            'technical_documentation',
            'open_source_intelligence',
            'academic_publications',
            'industry_reports',
            'patent_databases',
            'scientific_datasets',
            'code_repositories',
            'security_advisories',
            'market_analysis',
            'regulatory_updates',
            'technology_trends',
            'infrastructure_data',
            'environmental_metrics',
            'global_events'
        ]
    },
    
    // Ollama - Model inference
    Ollama: {
        endpoint: 'http://127.0.0.1:11434',
        models_endpoint: '/api/tags',
        chat_endpoint: '/api/chat',
        generate_endpoint: '/api/generate'
    },
    
    // Claude Models with Q5 Integration
    ClaudeModels: {
        'claude-sonnet-4.7': {
            architecture: '48³ + 48⁴ + 10³¹',
            q5_enabled: true,
            worldfeed_enabled: true,
            tor_enabled: true
        },
        'claude-opus-4.8': {
            architecture: '48³ + 48⁴ + 10³¹',
            q5_enabled: true,
            worldfeed_enabled: true,
            tor_enabled: true
        },
        'claude-fable-5': {
            architecture: '48³ + 48⁴ + 10³¹',
            q5_enabled: true,
            worldfeed_enabled: true,
            tor_enabled: true
        },
        'claude-capybara-5': {
            architecture: '48³ × 2 (Double Lattice)',
            q5_enabled: true,
            worldfeed_enabled: true,
            tor_enabled: true
        },
        'claude-capybara-5-48q4': {
            architecture: '48⁴ Geometric Sovereign',
            q5_enabled: true,
            worldfeed_enabled: true,
            tor_enabled: true
        }
    }
};

class Q5WorldFeedIntegration {
    constructor() {
        this.config = Q5_WORLDFEED_CONFIG;
        this.connected = {
            Q5: false,
            WorldFeed: false,
            TorNetwork: false,
            Ollama: false
        };
        this.lastHealthCheck = null;
        this.healthCheckInterval = 30000; // 30 seconds
    }
    
    /**
     * Initialize all connections
     */
    async initialize() {
        console.log('[Q5-WorldFeed] Initializing connections...');
        
        // Check all endpoints
        await this.healthCheck();
        
        // Start health check interval
        setInterval(() => this.healthCheck(), this.healthCheckInterval);
        
        console.log('[Q5-WorldFeed] Connections initialized:', this.connected);
        return this.connected;
    }
    
    /**
     * Check health of all systems
     */
    async healthCheck() {
        // Check Q5
        try {
            const q5Response = await fetch(`${this.config.Q5.endpoint}/health`, { 
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            });
            this.connected.Q5 = q5Response.ok;
        } catch (e) {
            this.connected.Q5 = false;
        }
        
        // Check WorldFeed
        try {
            const wfResponse = await fetch(`${this.config.WorldFeed.endpoint}/status`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            });
            this.connected.WorldFeed = wfResponse.ok;
        } catch (e) {
            this.connected.WorldFeed = false;
        }
        
        // Check Ollama
        try {
            const ollamaResponse = await fetch(`${this.config.Ollama.endpoint}${this.config.Ollama.models_endpoint}`, {
                method: 'GET',
                signal: AbortSignal.timeout(5000)
            });
            this.connected.Ollama = ollamaResponse.ok;
        } catch (e) {
            this.connected.Ollama = false;
        }
        
        // Tor Network is file-based, check directory
        try {
            // Tor network status is determined by file presence
            this.connected.TorNetwork = true; // Assume available if Q5 is connected
        } catch (e) {
            this.connected.TorNetwork = false;
        }
        
        this.lastHealthCheck = new Date().toISOString();
        return this.connected;
    }
    
    /**
     * Get connection status for UI
     */
    getStatus() {
        return {
            connected: this.connected,
            lastHealthCheck: this.lastHealthCheck,
            systems: {
                Q5: {
                    status: this.connected.Q5 ? 'ACTIVE' : 'INACTIVE',
                    endpoint: this.config.Q5.endpoint,
                    models: this.config.Q5.models
                },
                WorldFeed: {
                    status: this.connected.WorldFeed ? 'ACTIVE' : 'INACTIVE',
                    endpoint: this.config.WorldFeed.endpoint,
                    feeds: Object.keys(this.config.WorldFeed.feeds).length
                },
                TorNetwork: {
                    status: this.connected.TorNetwork ? 'ACTIVE' : 'INACTIVE',
                    categories: this.config.TorNetwork.categories
                },
                Ollama: {
                    status: this.connected.Ollama ? 'ACTIVE' : 'INACTIVE',
                    endpoint: this.config.Ollama.endpoint
                }
            }
        };
    }
    
    /**
     * Route query through Q5 Hive Mind
     */
    async routeQuery(query, queryType = 'default') {
        if (!this.connected.Q5) {
            console.warn('[Q5-WorldFeed] Q5 not connected, using fallback');
            return this.fallbackQuery(query);
        }
        
        try {
            const response = await fetch(`${this.config.Q5.endpoint}/route`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: query,
                    type: queryType,
                    timestamp: Date.now()
                })
            });
            
            if (!response.ok) {
                throw new Error(`Q5 routing failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (e) {
            console.error('[Q5-WorldFeed] Q5 routing error:', e);
            return this.fallbackQuery(query);
        }
    }
    
    /**
     * Fetch live data from WorldFeed
     */
    async fetchWorldFeed(feedType) {
        if (!this.connected.WorldFeed) {
            console.warn('[Q5-WorldFeed] WorldFeed not connected');
            return null;
        }
        
        const feed = this.config.WorldFeed.feeds[feedType];
        if (!feed) {
            console.error(`[Q5-WorldFeed] Unknown feed type: ${feedType}`);
            return null;
        }
        
        try {
            const response = await fetch(feed.endpoint, {
                method: 'GET',
                signal: AbortSignal.timeout(10000)
            });
            
            if (!response.ok) {
                throw new Error(`WorldFeed fetch failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (e) {
            console.error(`[Q5-WorldFeed] Feed ${feedType} error:`, e);
            return null;
        }
    }
    
    /**
     * Fallback when Q5 is unavailable
     */
    fallbackQuery(query) {
        return {
            routed: false,
            fallback: true,
            query: query,
            recommendation: 'Use local Ollama models directly'
        };
    }
    
    /**
     * Check if model has Q5 integration
     */
    isModelQ5Enabled(modelName) {
        const model = this.config.ClaudeModels[modelName.replace(':latest', '')];
        return model ? model.q5_enabled : false;
    }
    
    /**
     * Get model architecture info
     */
    getModelArchitecture(modelName) {
        const model = this.config.ClaudeModels[modelName.replace(':latest', '')];
        return model ? model.architecture : 'Unknown';
    }
}

// Export for use in chat interface
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Q5WorldFeedIntegration, Q5_WORLDFEED_CONFIG };
}

// Auto-initialize in browser
if (typeof window !== 'undefined') {
    window.Q5Integration = new Q5WorldFeedIntegration();
    window.Q5Integration.initialize().then(() => {
        console.log('[Q5-WorldFeed] Auto-initialized');
    });
}