# Quick Start Script for AI Chat
# This script starts all required services in new terminal windows

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "AI Chat - Quick Start" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Ollama is installed
if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
    Write-Host "✗ Ollama is not installed!" -ForegroundColor Red
    Write-Host "  Install it from: https://ollama.ai" -ForegroundColor Yellow
    Write-Host "  Or run: winget install Ollama.Ollama" -ForegroundColor Yellow
    exit 1
}

# Check if LiteLLM is installed
if (-not (Get-Command litellm -ErrorAction SilentlyContinue)) {
    Write-Host "⚠ LiteLLM is not installed. Installing now..." -ForegroundColor Yellow
    pip install litellm[proxy]
}

Write-Host "Starting services..." -ForegroundColor Green
Write-Host ""

# Start Ollama (if not already running)
Write-Host "1. Starting Ollama..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✓ Ollama already running" -ForegroundColor Green
} catch {
    Write-Host "   Starting Ollama in new terminal..." -ForegroundColor Gray
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Ollama Server' -ForegroundColor Cyan; ollama serve"
    Start-Sleep -Seconds 3
}

# Check if phi3:mini is installed
Write-Host ""
Write-Host "2. Checking Phi-3 model..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    $models = ($response.Content | ConvertFrom-Json).models
    $hasPhi3 = $models | Where-Object { $_.name -like "phi3*" }
    
    if ($hasPhi3) {
        Write-Host "   ✓ Phi-3 model found" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ Phi-3 not installed. Pulling now..." -ForegroundColor Yellow
        Write-Host "   This may take a few minutes (downloading ~2.3GB)" -ForegroundColor Gray
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Downloading Phi-3 Mini...' -ForegroundColor Cyan; ollama pull phi3:mini; Write-Host 'Download complete!' -ForegroundColor Green; Read-Host 'Press Enter to close'"
    }
} catch {
    Write-Host "   ⚠ Could not check models. Ollama might still be starting..." -ForegroundColor Yellow
}

# Start LiteLLM Proxy
Write-Host ""
Write-Host "3. Starting LiteLLM Proxy..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/health" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✓ LiteLLM Proxy already running" -ForegroundColor Green
} catch {
    Write-Host "   Starting LiteLLM Proxy in new terminal..." -ForegroundColor Gray
    $scriptPath = $PSScriptRoot
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'LiteLLM Proxy Server' -ForegroundColor Cyan; cd '$scriptPath'; litellm --config litellm-config.yaml --port 11434"
    Start-Sleep -Seconds 3
}

# Start Next.js (if not already running)
Write-Host ""
Write-Host "4. Starting Next.js..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✓ Next.js already running" -ForegroundColor Green
} catch {
    Write-Host "   Starting Next.js in new terminal..." -ForegroundColor Gray
    $scriptPath = $PSScriptRoot
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Next.js Development Server' -ForegroundColor Cyan; cd '$scriptPath'; npm run dev"
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✓ Services started!" -ForegroundColor Green
Write-Host ""
Write-Host "Wait a few seconds for all services to initialize, then:" -ForegroundColor White
Write-Host "  Open http://localhost:3000 in your browser" -ForegroundColor Cyan
Write-Host ""
Write-Host "To check service status, run:" -ForegroundColor White
Write-Host "  .\check-services.ps1" -ForegroundColor Gray
Write-Host ""
