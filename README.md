# Claude AI Chat Interface - Oroboros-Anthropic

A modern, responsive chat interface for Claude AI models (Opus, Fable, Capybara) connected to the Oroboros-Anthropic infrastructure.

## 🎯 Features

- **3 Claude Models**: Opus 9.6GB, Fable 9.6GB, Capybara 9.6GB
- 🎨 **Modern UI**: Clean, responsive design with dark/light themes
- 📱 **Media Support**: Voice, Image, Webpage, Audio, Video Production
- ⚡ **Real-time Streaming**: Instant response streaming
- 🔧 **Settings Panel**: Comprehensive configuration options
- 🌐 **Connected**: Routes through Oroboros-Anthropic Vercel deployment

## 📦 Models Available

| Model | ID | Size | Description |
|-------|----|----|-------------|
| Claude Opus 9.6GB | `claude-opus-9.6gb:latest` | 9.6GB | Most capable model for complex tasks |
| Claude Fable 9.6GB | `claude-fable-9.6gb:latest` | 9.6GB | Creative storytelling and content generation |
| Claude Capybara 9.6GB | `claude-capybara-9.6gb:latest` | 9.6GB | Fast, efficient responses |

## 🚀 Quick Start

1. Open `chat-anthropic.html` in your browser
2. Select your preferred Claude model
3. Start chatting!

## 🔗 Connection

- **API Router**: `https://oroboroslabs-ai-anthropic.vercel.app/claude-ai`
- **Repository**: `https://github.com/oroboroslabs-ai/anthropic`
- **Vercel**: `https://oroboroslabs-ai-anthropic.vercel.app`

## 📡 Media Capabilities

- 🎤 **Voice Input/Output**: Speech recognition and synthesis
- 🖼️ **Image Analysis**: Upload and analyze images
- 🌐 **Webpage Content**: Fetch and analyze web pages
- 🎵 **Audio Processing**: Transcribe and process audio
- 🎬 **Video Production**: Generate and analyze videos

## ⚙️ Settings

- Theme customization (Dark/Light/Auto)
- Model selection and configuration
- Voice settings (rate, pitch, volume)
- Connection testing
- Response preferences

## 🔧 Technical Details

- **Frontend**: Pure HTML/CSS/JavaScript
- **Backend**: Ollama with Vercel routing
- **Streaming**: Real-time response streaming
- **Storage**: LocalStorage for chat history

## 📦 Deployment

### GitHub Repository

```bash
# Clone the repository
git clone https://github.com/oroboroslabs-ai/anthropic.git

# Navigate to chat interface
cd anthropic/claude-ai

# Open in browser
# Double-click chat-anthropic.html or serve with a local server
```

### Vercel Deployment

The chat interface is deployed at:
- **Main URL**: `https://oroboroslabs-ai-anthropic.vercel.app`
- **Chat Path**: `https://oroboroslabs-ai-anthropic.vercel.app/claude-ai`

## 🆘 Support

For issues and questions:
- GitHub: https://github.com/oroboroslabs-ai/anthropic/issues
- Documentation: https://github.com/oroboroslabs-ai/anthropic/wiki

## 📄 License

MIT License - See LICENSE file for details

## 🎨 Architecture

```
User → Vercel Edge → API Functions → Ollama Backend
```

## 📝 License

MIT

## 🔗 Related

- [DeepSeek Research](https://deepseekresearch.com)
- [Oroboros Labs](https://github.com/oroboroslabs)