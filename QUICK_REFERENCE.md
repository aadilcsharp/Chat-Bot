# 🚀 Quick Reference Guide

## Essential Commands

### Start Development Server
```bash
npm run dev
```
Then open: http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

### Start LiteLLM Proxy
```bash
litellm --config litellm-config.yaml --port 11434
```

### Start Ollama
```bash
ollama serve
```

### Pull Small Models (Low Memory)
```bash
ollama pull tinyllama
ollama pull qwen2:0.5b
```

### Pull Phi-3 Model (Standard Memory)
```bash
ollama pull phi3:mini
```

---

## Environment Variables

### Required (Frontend)
```env
NEXT_PUBLIC_LITELLM_PROXY_URL=http://localhost:11434
```

### Optional (LiteLLM Proxy - for cloud providers)
```powershell
# Windows PowerShell
$env:OPENAI_API_KEY="sk-your-key-here"
$env:ANTHROPIC_API_KEY="sk-ant-your-key-here"

# macOS/Linux Bash
export OPENAI_API_KEY="sk-your-key-here"
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

---

## File Locations

### Configuration
- **LiteLLM Config**: `litellm-config.yaml`
- **Environment**: `.env.local`
- **Tailwind**: `tailwind.config.ts`
- **TypeScript**: `tsconfig.json`

### Source Code
- **Main Page**: `app/page.tsx`
- **Components**: `components/`
- **API Client**: `lib/api.ts`
- **State Store**: `lib/store.ts`
- **Models**: `lib/models.ts`

### Documentation
- **Full Guide**: `README.md`
- **Quick Setup**: `SETUP.md`
- **Project Summary**: `PROJECT_SUMMARY.md`

---

## Common Tasks

### Add a New Model

1. Edit `litellm-config.yaml`:
```yaml
model_list:
  - model_name: your-model-id
    litellm_params:
      model: provider/model-name
      api_key: os.environ/YOUR_API_KEY
```

2. Edit `lib/models.ts`:
```typescript
{
  id: "your-model-id",
  name: "Display Name",
  provider: "provider",
  description: "Description",
  icon: "🎯",
}
```

3. Restart LiteLLM proxy

### Change Theme Colors

Edit `app/globals.css`:
```css
:root {
  --primary: 217.2 91.2% 59.8%;  /* Blue */
  --background: 222.2 84% 4.9%;   /* Dark */
  /* ... more colors ... */
}
```

### Modify System Prompt Default

Edit `lib/store.ts`:
```typescript
settings: {
  systemPrompt: "Your new default prompt here",
  // ...
}
```

---

## Troubleshooting Quick Fixes

### "Cannot connect to LiteLLM"
```bash
# Check if running
curl http://localhost:11434/health

# Restart
litellm --config litellm-config.yaml --port 11434
```

### "Cannot connect to Ollama"
```bash
# Check if running
curl http://localhost:11434/api/tags

# Restart
ollama serve
```

### "Model not found"
```bash
# List models
ollama list

# Pull model
ollama pull tinyllama
```

### "Module not found" (Next.js)
```bash
# Reinstall
rm -rf node_modules .next
npm install
```

---

## Port Reference

| Service | Port | URL |
|---------|------|-----|
| Next.js Dev | 3000 | http://localhost:3000 |
| LiteLLM Proxy | 11434 | http://localhost:11434 |
| Ollama | 11434 | http://localhost:11434 |

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Send message | Enter |
| New line | Shift + Enter |
| Focus input | (auto-focused) |

---

## API Endpoints

### LiteLLM Proxy
- **Chat**: `POST http://localhost:11434/v1/chat/completions`
- **Health**: `GET http://localhost:11434/health`
- **Models**: `GET http://localhost:11434/v1/models`

### Ollama
- **Generate**: `POST http://localhost:11434/api/generate`
- **Tags**: `GET http://localhost:11434/api/tags`

---

## Model IDs Reference

| Model | ID in Config | Provider | Auth |
|-------|-------------|----------|------|
| TinyLlama | `tinyllama` | Ollama (Local) | Master Key |
| Qwen2 0.5B | `qwen2-0.5b` | Ollama (Local) | Master Key |
| Phi-3 Mini | `phi3-mini` | Ollama (Local) | Master Key |
| Claude 3.5 Sonnet | `claude-3-5-sonnet-20240620` | Anthropic | Master Key |
| GPT-4o | `gpt-4o` | OpenAI | Master Key |
| LLaMA 3 8B | `llama-3-8b` | OpenRouter | Master Key |

---

## Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **LiteLLM**: https://docs.litellm.ai
- **Ollama**: https://ollama.ai
- **Anthropic**: https://console.anthropic.com
- **OpenAI**: https://platform.openai.com

---

## Project Structure (Simplified)

```
Chat-bot-Local/
├── app/              # Next.js pages
├── components/       # React components
├── lib/              # Utilities & API
├── litellm-config.yaml
├── package.json
└── README.md
```

---

## Quick Checklist Before Starting

- [ ] Node.js installed
- [ ] Python installed
- [ ] Ollama installed and running
- [ ] Small model pulled (e.g., `tinyllama`)
- [ ] LiteLLM installed
- [ ] NPM packages installed
- [ ] LiteLLM proxy running
- [ ] Next.js dev server running

---

**Need help? Check README.md for detailed documentation!**
