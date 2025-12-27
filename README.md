# AI Chat - Multi-Provider Chatbot

A modern, full-stack React chatbot application built with Next.js 14 (App Router) that supports multiple LLM providers through a unified LiteLLM proxy backend.

## 🚀 Features

- **Multiple LLM Providers**:
  - 🏠 Local: Microsoft Phi-3 (via Ollama)
  - 🧠 Cloud: Anthropic Claude 3.5 Sonnet
  - ⚡ Cloud: OpenAI GPT-4o

- **Modern UI/UX**:
  - Beautiful dark theme with gradient accents
  - Real-time streaming responses
  - Markdown rendering with syntax highlighting
  - Auto-scrolling chat interface
  - Responsive design

- **Advanced Features**:
  - Adjustable temperature and max tokens
  - Custom system prompts
  - Chat history management
  - Error handling with user-friendly messages
  - Loading states and animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn
- **Python** 3.8+ (for LiteLLM proxy)
- **Ollama** (for local Phi-3 models)

## 🛠️ Setup Instructions

### Step 1: Install Ollama and Pull Phi-3 Model

1. **Install Ollama**:
   - Windows: Download from [ollama.ai](https://ollama.ai)
   - macOS: `brew install ollama`
   - Linux: `curl -fsSL https://ollama.ai/install.sh | sh`

2. **Start Ollama** (if not running):
   ```bash
   ollama serve
   ```

3. **Pull Phi-3 models**:
   ```bash
   # Pull the mini version (recommended for most systems)
   ollama pull phi3:mini
   
   # Optional: Pull the medium version (requires more RAM)
   ollama pull phi3:medium
   ```

4. **Verify Ollama is running**:
   ```bash
   curl http://localhost:11434/api/tags
   ```

### Step 2: Install and Configure LiteLLM Proxy

1. **Install LiteLLM**:
   ```bash
   pip install litellm[proxy]
   ```

2. **Set up API keys** (for cloud providers):
   
   **Windows (PowerShell)**:
   ```powershell
   $env:OPENAI_API_KEY="sk-your-openai-key-here"
   $env:ANTHROPIC_API_KEY="sk-ant-your-anthropic-key-here"
   ```
   
   **macOS/Linux**:
   ```bash
   export OPENAI_API_KEY="sk-your-openai-key-here"
   export ANTHROPIC_API_KEY="sk-ant-your-anthropic-key-here"
   ```

   > **Note**: If you only want to use local Phi-3, you can skip setting API keys.

3. **Start the LiteLLM proxy**:
   ```bash
   litellm --config litellm-config.yaml --port 11434
   ```

   The proxy will start at `http://localhost:11434` and provide an OpenAI-compatible API.

### Step 3: Install and Run the Next.js Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   
   The `.env.local` file is already created with:
   ```
   NEXT_PUBLIC_LITELLM_PROXY_URL=http://localhost:11434
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Select a Model**: Choose from the sidebar:
   - Phi-3 Mini/Medium (Local) - Free, runs on your machine
   - Claude 3.5 Sonnet - Requires Anthropic API key
   - GPT-4o - Requires OpenAI API key

2. **Adjust Settings**:
   - **System Prompt**: Define the AI's behavior
   - **Temperature**: Control creativity (0 = precise, 2 = creative)
   - **Max Tokens**: Set response length limit

3. **Start Chatting**: Type your message and press Enter (Shift+Enter for new line)

4. **Clear Chat**: Click "Clear Chat" to start a new conversation

## 🏗️ Project Structure

```
Chat-bot-Local/
├── app/
│   ├── globals.css          # Global styles with dark theme
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main chat page
├── components/
│   ├── ChatContainer.tsx     # Main chat interface
│   ├── ChatInput.tsx         # Message input component
│   ├── ChatMessage.tsx       # Message bubble component
│   └── Sidebar.tsx           # Settings sidebar
├── lib/
│   ├── api.ts                # LiteLLM API client
│   ├── models.ts             # Model configurations
│   ├── store.ts              # Zustand state management
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Utility functions
├── litellm-config.yaml       # LiteLLM proxy configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🔧 Configuration

### Adding New Models

Edit `litellm-config.yaml` to add more models:

```yaml
model_list:
  - model_name: your-model-name
    litellm_params:
      model: provider/model-name
      api_key: os.environ/YOUR_API_KEY
```

Then add the model to `lib/models.ts`:

```typescript
{
  id: "your-model-name",
  name: "Display Name",
  provider: "provider",
  description: "Model description",
  icon: "🎯",
}
```

### Customizing the UI

- **Theme Colors**: Edit CSS variables in `app/globals.css`
- **Components**: Modify components in `components/` directory
- **Styling**: Uses Tailwind CSS utility classes

## 🐛 Troubleshooting

### LiteLLM Proxy Issues

**Error: "Connection refused"**
- Ensure LiteLLM proxy is running: `litellm --config litellm-config.yaml --port 11434`
- Check the proxy URL in `.env.local`

**Error: "Invalid API key"**
- Verify API keys are set in your environment
- Restart the LiteLLM proxy after setting keys

### Ollama Issues

**Error: "Model not found"**
- Pull the model: `ollama pull phi3:mini`
- Verify Ollama is running: `ollama serve`

**Error: "Connection to Ollama failed"**
- Check Ollama is running on port 11434
- Verify with: `curl http://localhost:11434/api/tags`

### Next.js Issues

**Error: "Module not found"**
- Run `npm install` to install dependencies
- Delete `node_modules` and `.next`, then reinstall

## 📝 API Key Security

- **Never commit API keys** to version control
- Use environment variables for all sensitive data
- The Next.js app does NOT need API keys (only the LiteLLM proxy does)
- API keys are read by LiteLLM from environment variables

## 🚀 Production Deployment

1. **Build the Next.js app**:
   ```bash
   npm run build
   npm start
   ```

2. **Deploy LiteLLM proxy** on a server:
   ```bash
   litellm --config litellm-config.yaml --port 11434 --host 0.0.0.0
   ```

3. **Update environment variables** to point to your production proxy URL

4. **Secure the proxy** with authentication (update `master_key` in config)

## 📚 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **State Management**: Zustand
- **Markdown**: react-markdown, remark-gfm
- **Icons**: Lucide React
- **Backend Proxy**: LiteLLM
- **Local LLM**: Ollama + Microsoft Phi-3
- **Cloud LLMs**: Anthropic Claude, OpenAI GPT-4o

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Microsoft for Phi-3
- Anthropic for Claude
- OpenAI for GPT-4o
- LiteLLM for the unified proxy
- Ollama for local inference
- Vercel for Next.js

---

**Happy Chatting! 🎉**
