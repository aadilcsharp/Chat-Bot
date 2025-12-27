# Service Status Checker for AI Chat
# Run this to check if all required services are running

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "AI Chat - Service Status Checker" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Ollama
Write-Host "Checking Ollama (http://localhost:11434)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "OK Ollama is running" -ForegroundColor Green
    
    # Parse and show available models
    $models = ($response.Content | ConvertFrom-Json).models
    if ($models.Count -gt 0) {
        Write-Host "  Available models:" -ForegroundColor Gray
        foreach ($model in $models) {
            Write-Host "    - $($model.name)" -ForegroundColor Gray
        }
    } else {
        Write-Host "  WARNING No models installed. Run: ollama pull phi3:mini" -ForegroundColor Yellow
        $allGood = $false
    }
} catch {
    Write-Host "ERROR Ollama is NOT running" -ForegroundColor Red
    Write-Host "  Start it with: ollama serve" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""

# Check LiteLLM Proxy
Write-Host "Checking LiteLLM Proxy (http://localhost:11434)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/health" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "OK LiteLLM Proxy is running" -ForegroundColor Green
} catch {
    Write-Host "ERROR LiteLLM Proxy is NOT running" -ForegroundColor Red
    Write-Host "  Start it with: litellm --config litellm-config.yaml --port 11434" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""

# Check Next.js Dev Server
Write-Host "Checking Next.js Dev Server (http://localhost:3000)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "OK Next.js is running" -ForegroundColor Green
} catch {
    Write-Host "ERROR Next.js is NOT running" -ForegroundColor Red
    Write-Host "  Start it with: npm run dev" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "OK All services are running!" -ForegroundColor Green
    Write-Host "  Open http://localhost:3000 to start chatting" -ForegroundColor Cyan
} else {
    Write-Host "WARNING Some services are not running" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick Start Commands:" -ForegroundColor White
    Write-Host ""
    Write-Host "Terminal 1 - Ollama:" -ForegroundColor Yellow
    Write-Host "  ollama serve" -ForegroundColor White
    Write-Host ""
    Write-Host "Terminal 2 - LiteLLM Proxy:" -ForegroundColor Yellow
    Write-Host "  litellm --config litellm-config.yaml --port 11434" -ForegroundColor White
    Write-Host ""
    Write-Host "Terminal 3 - Next.js (already running):" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor White
}

Write-Host ""
