# 🎯 Getting Started - Your First Chat in 5 Minutes

Welcome! This guide will get you chatting with AI in just 5 minutes.

## 📋 What You'll Need

Before starting, make sure you have:
- ✅ **Node.js 18+** - Already installed (used to install packages)
- ⬜ **Python 3.8+** - For LiteLLM proxy
- ⬜ **Ollama** - For local models (TinyLlama, Qwen2, Phi-3)

---

## 🚀 Step-by-Step Setup

### Step 1: Install Ollama (2 minutes)

**Windows:**
```powershell
# Option 1: Download installer
# Go to https://ollama.ai and download

# Option 2: Use winget
winget install Ollama.Ollama
```

**macOS:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 2: Start Ollama & Pull Models (2 minutes)

Open a **new terminal window** and run:

```bash
# Start Ollama server
ollama serve
```

Keep this terminal open! Now open **another terminal** and pull a model that fits your computer's memory:

**For low memory ( < 4GB RAM):**
```bash
# Pull TinyLlama (about 640MB)
ollama pull tinyllama

# OR Pull Qwen2 0.5B (about 350MB) - Very fast!
ollama pull qwen2:0.5b
```

**For standard memory (8GB+ RAM):**
```bash
# Pull Phi-3 mini model (about 2.3GB)
ollama pull phi3:mini
```

Wait for the download to complete. You'll see progress bars.

### Step 3: Install LiteLLM (30 seconds)

In a **new terminal**, run:

```bash
pip install litellm[proxy]
```

### Step 4: Start LiteLLM Proxy (30 seconds)

In the **same terminal**, navigate to the project and start the proxy:

```bash
cd g:\Chat-bot-Local
litellm --config litellm-config.yaml --port 11434
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:11434
```

Keep this terminal open!

### Step 5: Start the Chat App (30 seconds)

Open **one more terminal** and run:

```bash
cd g:\Chat-bot-Local
npm run dev
```

You should see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### Step 6: Open Your Browser! 🎉

Go to: **http://localhost:3000**

You should see the beautiful chat interface!

---

## 🎮 Using the App

### 1. Select a Model
In the left sidebar, click on **"TinyLlama (Local) 🏠"** or **"Qwen2 0.5B (Local) 🏠"** - one of these should already be selected.

### 2. Type a Message
At the bottom, type something like:
```
Hello! Can you help me learn about AI?
```

### 3. Press Enter
Watch as the AI responds in real-time! ✨

### 4. Adjust Settings (Optional)
- **Temperature**: Higher = more creative, Lower = more focused
- **Max Tokens**: How long the response can be
- **System Prompt**: Change how the AI behaves

---

## 🌐 Adding Cloud Providers (Optional)

Want to use Claude or GPT-4o? Here's how:

### For Claude 3.5 Sonnet:

1. **Get an API key** from [Anthropic Console](https://console.anthropic.com/)

2. **Set the environment variable** (in the terminal where you run LiteLLM):

   **Windows PowerShell:**
   ```powershell
   $env:ANTHROPIC_API_KEY="sk-ant-your-key-here"
   ```

   **macOS/Linux:**
   ```bash
   export ANTHROPIC_API_KEY="sk-ant-your-key-here"
   ```

3. **Restart the LiteLLM proxy** (Ctrl+C, then run the command again)

4. **Select Claude** in the sidebar!

### For GPT-4o:

1. **Get an API key** from [OpenAI Platform](https://platform.openai.com/)

2. **Set the environment variable:**

   **Windows PowerShell:**
   ```powershell
   $env:OPENAI_API_KEY="sk-your-key-here"
   ```

   **macOS/Linux:**
   ```bash
   export OPENAI_API_KEY="sk-your-key-here"
   ```

3. **Restart the LiteLLM proxy**

4. **Select GPT-4o** in the sidebar!

---

## 🎯 Quick Terminal Reference

You need **3 terminals running simultaneously**:

### Terminal 1: Ollama
```bash
ollama serve
```
**Status**: Keep running in background

### Terminal 2: LiteLLM Proxy
```bash
cd g:\Chat-bot-Local
litellm --config litellm-config.yaml --port 11434
```
**Status**: Keep running in background

### Terminal 3: Next.js App
```bash
cd g:\Chat-bot-Local
npm run dev
```
**Status**: Keep running in background

---

## ✅ Verification Checklist

Before you start, verify everything is working:

### Check Ollama:
```bash
curl http://localhost:11434/api/tags
```
✅ Should return JSON with model list

### Check LiteLLM:
```bash
curl http://localhost:11434/health
```
✅ Should return health status

### Check Next.js:
Open http://localhost:3000 in browser
✅ Should see the chat interface

---

## 🐛 Common Issues & Fixes

### "Cannot connect to Ollama"
**Problem**: Ollama isn't running
**Fix**: Run `ollama serve` in a terminal

### "Model not found"
**Problem**: Model not downloaded
**Fix**: Run `ollama pull tinyllama` or `ollama pull qwen2:0.5b`

### "Cannot connect to LiteLLM proxy"
**Problem**: LiteLLM isn't running
**Fix**: Run `litellm --config litellm-config.yaml --port 11434`

### "Port already in use"
**Problem**: Another app is using the port
**Fix**: 
- For Ollama (11434): Stop other Ollama instances
- For LiteLLM (11434): Change port in `.env.local`
- For Next.js (3000): It will auto-select 3001

### Nothing happens when I send a message
**Problem**: Check browser console (F12)
**Fix**: Make sure all 3 services are running

---

## 🎨 Customization Ideas

### Change the Theme
Edit `app/globals.css` to change colors:
```css
:root {
  --primary: 217.2 91.2% 59.8%;  /* Change this! */
}
```

### Add a New Model
1. Add to `litellm-config.yaml`
2. Add to `lib/models.ts`
3. Restart LiteLLM proxy

### Change Default Settings
Edit `lib/store.ts`:
```typescript
settings: {
  temperature: 0.9,  // More creative
  maxTokens: 4096,   // Longer responses
  systemPrompt: "You are a friendly coding assistant.",
}
```

---

## 📚 Next Steps

Once you're up and running:

1. **Read the full docs**: Check out `README.md`
2. **Explore the code**: Look at `components/` and `lib/`
3. **Try different models**: Compare Phi-3, Claude, and GPT-4o
4. **Customize the UI**: Make it your own!
5. **Deploy it**: Share with friends!

---

## 🆘 Need Help?

- **Full Documentation**: `README.md`
- **Architecture**: `ARCHITECTURE.md`
- **Quick Reference**: `QUICK_REFERENCE.md`
- **Setup Guide**: `SETUP.md`

---

## 🎉 You're Ready!

That's it! You now have a fully functional AI chatbot with:
- ✅ Local AI (Phi-3) - Free and private
- ✅ Cloud AI (Claude, GPT-4o) - Optional
- ✅ Beautiful UI with dark theme
- ✅ Real-time streaming responses
- ✅ Markdown support
- ✅ Customizable settings

**Happy chatting! 🚀**

---

## 💡 Pro Tips

1. **Use Phi-3 for privacy** - Everything stays on your machine
2. **Use Claude for reasoning** - Great for complex questions
3. **Use GPT-4o for coding** - Excellent at writing code
4. **Adjust temperature** - Lower for facts, higher for creativity
5. **Save your API keys** - Add them to your shell profile
6. **Try different system prompts** - Make the AI a specialist!

---

**Enjoy your new AI chatbot! 🎊**
