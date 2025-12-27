# 🔧 Troubleshooting Guide

## Error: "Failed to fetch" or "Cannot connect to LiteLLM proxy"

### Problem
The frontend cannot connect to the LiteLLM proxy server.

### Solution

**Step 1: Check if LiteLLM proxy is running**

Run the service checker:
```powershell
.\check-services.ps1
```

**Step 2: Start the LiteLLM proxy**

Open a **new terminal** and run:
```powershell
cd g:\Chat-bot-Local
litellm --config litellm-config.yaml --port 11434
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:11434
```

Keep this terminal open!

**Step 3: Verify it's running**

In another terminal:
```powershell
curl http://localhost:11434/health
```

Should return a health status response.

---

## Error: "Model not found" or Ollama connection issues

### Problem
Ollama is not running or the Phi-3 model is not installed.

### Solution

**Step 1: Check if Ollama is running**

```powershell
curl http://localhost:11434/api/tags
```

**Step 2: Start Ollama**

Open a **new terminal** and run:
```powershell
ollama serve
```

Keep this terminal open!

**Step 3: Pull the Phi-3 model**

In another terminal:
```powershell
ollama pull phi3:mini
```

This will download about 2.3GB. Wait for it to complete.

**Step 4: Verify the model**

```powershell
ollama list
```

You should see `phi3:mini` in the list.

---

## Quick Fix: Start All Services

### Option 1: Automated (Recommended)

Run the start-all script:
```powershell
.\start-all.ps1
```

This will automatically start all required services in separate terminal windows.

### Option 2: Manual

You need **3 terminal windows**:

**Terminal 1 - Ollama:**
```powershell
ollama serve
```

**Terminal 2 - LiteLLM Proxy:**
```powershell
cd g:\Chat-bot-Local
litellm --config litellm-config.yaml --port 11434
```

**Terminal 3 - Next.js (already running):**
```powershell
cd g:\Chat-bot-Local
npm run dev
```

---

## Error Messages Explained

### "Cannot connect to LiteLLM proxy at http://localhost:11434"

**Cause**: LiteLLM proxy is not running

**Fix**: Start the proxy:
```powershell
litellm --config litellm-config.yaml --port 11434
```

### "Model 'ollama/phi3:mini' not found"

**Cause**: Either:
1. Ollama is not running
2. Phi-3 model is not installed

**Fix**:
```powershell
# Start Ollama
ollama serve

# In another terminal, pull the model
ollama pull phi3:mini
```

### "Authentication failed"

**Cause**: API keys not set for cloud providers (Claude, GPT-4o)

**Fix**: Set environment variables before starting LiteLLM:
```powershell
$env:OPENAI_API_KEY="sk-your-key-here"
$env:ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Then restart LiteLLM
litellm --config litellm-config.yaml --port 11434
```

---

## Common Issues

### Port Already in Use

**Error**: "Address already in use"

**Fix**: Find and kill the process using the port:

```powershell
# For port 11434 (LiteLLM)
netstat -ano | findstr :11434
taskkill /PID <PID> /F

# For port 11434 (Ollama)
netstat -ano | findstr :11434
taskkill /PID <PID> /F

# For port 3000 (Next.js)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### LiteLLM Not Found

**Error**: "litellm: command not found"

**Fix**: Install LiteLLM:
```powershell
pip install litellm[proxy]
```

### Ollama Not Found

**Error**: "ollama: command not found"

**Fix**: Install Ollama:
```powershell
# Windows
winget install Ollama.Ollama

# Or download from https://ollama.ai
```

### Python/pip Not Found

**Error**: "pip: command not found"

**Fix**: Install Python from https://python.org (version 3.8+)

Make sure to check "Add Python to PATH" during installation.

---

## Service Status Check

Always run this first when troubleshooting:

```powershell
.\check-services.ps1
```

This will show you exactly which services are running and which are not.

---

## Complete Reset

If nothing works, try a complete reset:

**Step 1: Stop all services**

Close all terminal windows running:
- ollama serve
- litellm
- npm run dev

**Step 2: Restart in order**

```powershell
# Terminal 1
ollama serve

# Wait 5 seconds, then Terminal 2
ollama pull phi3:mini

# Wait for download, then Terminal 3
cd g:\Chat-bot-Local
litellm --config litellm-config.yaml --port 11434

# Wait 5 seconds, then Terminal 4
cd g:\Chat-bot-Local
npm run dev
```

**Step 3: Verify**

```powershell
.\check-services.ps1
```

All services should show as running.

---

## Still Having Issues?

1. **Check the logs** in each terminal window for error messages
2. **Verify ports** are not blocked by firewall
3. **Check .env.local** has the correct proxy URL
4. **Restart your computer** (sometimes helps with port conflicts)
5. **Check the documentation**:
   - README.md
   - GETTING_STARTED.md
   - QUICK_REFERENCE.md

---

## Helpful Commands

### Check Service Status
```powershell
.\check-services.ps1
```

### Start All Services
```powershell
.\start-all.ps1
```

### Check Ollama Models
```powershell
ollama list
```

### Test LiteLLM Proxy
```powershell
curl http://localhost:11434/v1/models
```

### Test Ollama
```powershell
curl http://localhost:11434/api/tags
```

### Check Next.js
```powershell
curl http://localhost:3000
```

---

## Success Checklist

Before trying to chat, ensure:

- [ ] Ollama is running (`ollama serve`)
- [ ] Phi-3 model is installed (`ollama list` shows phi3:mini)
- [ ] LiteLLM proxy is running (port 11434)
- [ ] Next.js is running (port 3000)
- [ ] All services show "OK" in `.\check-services.ps1`

Once all are checked, open http://localhost:3000 and try chatting!

---

**Need more help?** Check the full documentation in README.md
