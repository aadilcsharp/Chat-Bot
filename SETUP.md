# Quick Setup Guide

This guide will get you up and running in 5 minutes.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Python 3.8+ installed
- [ ] Ollama installed

## Quick Start (Local Only - No API Keys Required)

### 1. Install Ollama

**Windows**:
```powershell
# Download and install from https://ollama.ai
# Or use winget:
winget install Ollama.Ollama
```

**macOS**:
```bash
brew install ollama
```

**Linux**:
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Start Ollama and Pull Models

```bash
# Start Ollama (in a new terminal)
ollama serve

# Pull a model that fits your memory:
# For < 4GB RAM:
ollama pull tinyllama
ollama pull qwen2:0.5b

# For 4GB+ RAM:
ollama pull phi3:mini
```

### 3. Install LiteLLM

```bash
pip install litellm[proxy]
```

### 4. Start LiteLLM Proxy

```bash
# Navigate to the project directory
cd Chat-bot-Local

# Start the proxy (in a new terminal)
litellm --config litellm-config.yaml --port 11434
```

### 5. Install and Run Next.js App

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### 6. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Adding Cloud Providers (Optional)

### For Claude 3.5 Sonnet:

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)

2. Set the environment variable:
   ```powershell
   # Windows PowerShell
   $env:ANTHROPIC_API_KEY="sk-ant-your-key-here"
   ```
   ```bash
   # macOS/Linux
   export ANTHROPIC_API_KEY="sk-ant-your-key-here"
   ```

3. Restart the LiteLLM proxy

### For GPT-4o:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/)

2. Set the environment variable:
   ```powershell
   # Windows PowerShell
   $env:OPENAI_API_KEY="sk-your-key-here"
   ```
   ```bash
   # macOS/Linux
   export OPENAI_API_KEY="sk-your-key-here"
   ```

3. Restart the LiteLLM proxy

## Verification Steps

### Check Ollama:
```bash
curl http://localhost:11434/api/tags
```
Should return a list of installed models including phi3.

### Check LiteLLM Proxy:
```bash
curl http://localhost:11434/health
```
Should return `{"status":"healthy"}` or similar.

### Check Next.js App:
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Common Issues

### "Cannot connect to Ollama"
- Ensure `ollama serve` is running
- Check if port 11434 is available

### "Cannot connect to LiteLLM proxy"
- Ensure LiteLLM is running on port 11434
- Check if the config file path is correct

### "Model not found"
- Run `ollama pull tinyllama` or `ollama pull qwen2:0.5b`
- Verify with `ollama list`

## Running Everything (All Terminals)

You'll need **3 terminal windows**:

**Terminal 1 - Ollama**:
```bash
ollama serve
```

**Terminal 2 - LiteLLM Proxy**:
```bash
cd Chat-bot-Local
litellm --config litellm-config.yaml --port 11434
```

**Terminal 3 - Next.js App**:
```bash
cd Chat-bot-Local
npm run dev
```

## Next Steps

- Customize the system prompt in the sidebar
- Adjust temperature and max tokens
- Try different models
- Read the full README.md for advanced features

---

**You're all set! Start chatting with AI! 🚀**
