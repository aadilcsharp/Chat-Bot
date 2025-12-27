#!/bin/bash

# AI Chat - Multi-Provider Chatbot Setup Script
# This script helps you set up all required services

echo "=================================="
echo "AI Chat Setup Assistant"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org${NC}"
    exit 1
fi

# Check Python
echo -e "${YELLOW}Checking Python...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓ Python installed: $PYTHON_VERSION${NC}"
else
    echo -e "${RED}✗ Python not found. Please install Python 3.8+ from https://python.org${NC}"
    exit 1
fi

# Check Ollama
echo -e "${YELLOW}Checking Ollama...${NC}"
if command -v ollama &> /dev/null; then
    echo -e "${GREEN}✓ Ollama installed${NC}"
    
    # Check if Ollama is running
    if curl -s http://localhost:11434/api/tags &> /dev/null; then
        echo -e "${GREEN}✓ Ollama is running${NC}"
    else
        echo -e "${YELLOW}⚠ Ollama is installed but not running${NC}"
        echo -e "${YELLOW}  Run 'ollama serve' in a new terminal${NC}"
    fi
else
    echo -e "${RED}✗ Ollama not found. Please install from https://ollama.ai${NC}"
    echo -e "${YELLOW}  macOS: brew install ollama${NC}"
    echo -e "${YELLOW}  Linux: curl -fsSL https://ollama.ai/install.sh | sh${NC}"
fi

# Check LiteLLM
echo -e "${YELLOW}Checking LiteLLM...${NC}"
if command -v litellm &> /dev/null; then
    echo -e "${GREEN}✓ LiteLLM installed${NC}"
else
    echo -e "${YELLOW}⚠ LiteLLM not found${NC}"
    echo -e "${YELLOW}  Installing LiteLLM...${NC}"
    pip3 install litellm[proxy]
fi

echo ""
echo "=================================="
echo "Setup Instructions"
echo "=================================="
echo ""

echo -e "${NC}You need to run 3 services in separate terminals:${NC}"
echo ""

echo -e "${YELLOW}Terminal 1 - Ollama Server:${NC}"
echo "  ollama serve"
echo ""

echo -e "${YELLOW}Terminal 2 - Pull Phi-3 Model (one-time):${NC}"
echo "  ollama pull phi3:mini"
echo ""

echo -e "${YELLOW}Terminal 3 - LiteLLM Proxy:${NC}"
echo "  cd $(pwd)"
echo "  litellm --config litellm-config.yaml --port 11434"
echo ""

echo -e "${YELLOW}Terminal 4 - Next.js App:${NC}"
echo "  cd $(pwd)"
echo "  npm run dev"
echo ""

echo -e "${YELLOW}Optional - Add API Keys for Cloud Providers:${NC}"
echo "  export OPENAI_API_KEY='sk-your-key-here'"
echo "  export ANTHROPIC_API_KEY='sk-ant-your-key-here'"
echo ""

echo "=================================="
echo "Setup complete!"
echo "=================================="
echo ""
echo -e "${GREEN}Run the commands above to start chatting!${NC}"
echo ""
