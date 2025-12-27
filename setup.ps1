# AI Chat - Multi-Provider Chatbot Setup Script
# This script helps you set up all required services

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "AI Chat Setup Assistant" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host "✓ Python installed: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python not found. Please install Python 3.8+ from https://python.org" -ForegroundColor Red
    exit 1
}

# Check Ollama
Write-Host "Checking Ollama..." -ForegroundColor Yellow
if (Get-Command ollama -ErrorAction SilentlyContinue) {
    Write-Host "✓ Ollama installed" -ForegroundColor Green
    
    # Check if Ollama is running
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -TimeoutSec 2
        Write-Host "✓ Ollama is running" -ForegroundColor Green
    } catch {
        Write-Host "⚠ Ollama is installed but not running" -ForegroundColor Yellow
        Write-Host "  Run 'ollama serve' in a new terminal" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ Ollama not found. Please install from https://ollama.ai" -ForegroundColor Red
    Write-Host "  Or run: winget install Ollama.Ollama" -ForegroundColor Yellow
}

# Check LiteLLM
Write-Host "Checking LiteLLM..." -ForegroundColor Yellow
if (Get-Command litellm -ErrorAction SilentlyContinue) {
    Write-Host "✓ LiteLLM installed" -ForegroundColor Green
} else {
    Write-Host "⚠ LiteLLM not found" -ForegroundColor Yellow
    Write-Host "  Installing LiteLLM..." -ForegroundColor Yellow
    pip install litellm[proxy]
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Setup Instructions" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "You need to run 3 services in separate terminals:" -ForegroundColor White
Write-Host ""

Write-Host "Terminal 1 - Ollama Server:" -ForegroundColor Yellow
Write-Host "  ollama serve" -ForegroundColor White
Write-Host ""

Write-Host "Terminal 2 - Pull Phi-3 Model (one-time):" -ForegroundColor Yellow
Write-Host "  ollama pull phi3:mini" -ForegroundColor White
Write-Host ""

Write-Host "Terminal 3 - LiteLLM Proxy:" -ForegroundColor Yellow
Write-Host "  cd $PSScriptRoot" -ForegroundColor White
Write-Host "  litellm --config litellm-config.yaml --port 11434" -ForegroundColor White
Write-Host ""

Write-Host "Terminal 4 - Next.js App:" -ForegroundColor Yellow
Write-Host "  cd $PSScriptRoot" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""

Write-Host "Optional - Add API Keys for Cloud Providers:" -ForegroundColor Yellow
Write-Host "  `$env:OPENAI_API_KEY='sk-your-key-here'" -ForegroundColor White
Write-Host "  `$env:ANTHROPIC_API_KEY='sk-ant-your-key-here'" -ForegroundColor White
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Quick Start Commands" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Would you like to start the services now? (y/n)"

if ($choice -eq 'y' -or $choice -eq 'Y') {
    Write-Host ""
    Write-Host "Starting services..." -ForegroundColor Green
    Write-Host "Note: This will open new terminal windows" -ForegroundColor Yellow
    Write-Host ""
    
    # Start Ollama (if not running)
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -TimeoutSec 2
    } catch {
        Write-Host "Starting Ollama..." -ForegroundColor Yellow
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "ollama serve"
        Start-Sleep -Seconds 3
    }
    
    # Start LiteLLM Proxy
    Write-Host "Starting LiteLLM Proxy..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; litellm --config litellm-config.yaml --port 11434"
    Start-Sleep -Seconds 2
    
    # Start Next.js
    Write-Host "Starting Next.js App..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"
    
    Write-Host ""
    Write-Host "✓ Services started!" -ForegroundColor Green
    Write-Host "  Open http://localhost:3000 in your browser" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Setup complete! Run the commands above manually." -ForegroundColor Green
    Write-Host ""
}
