# System Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                          │
│                     http://localhost:3000                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐                    ┌──────────────────────┐  │
│  │   Sidebar    │                    │   ChatContainer      │  │
│  │              │                    │                      │  │
│  │ • Model      │                    │ • Messages Display   │  │
│  │   Selection  │                    │ • Streaming          │  │
│  │ • System     │                    │ • Markdown Render    │  │
│  │   Prompt     │                    │ • Auto-scroll        │  │
│  │ • Temp       │                    │ • ChatInput          │  │
│  │ • Max Tokens │                    │                      │  │
│  │ • Clear Chat │                    │                      │  │
│  └──────────────┘                    └──────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Zustand State Store                         │  │
│  │  • messages[]  • settings  • isStreaming                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP POST /v1/chat/completions
                         │ (OpenAI-compatible API)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LiteLLM Proxy Server                         │
│                   http://localhost:11434                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              litellm-config.yaml                         │  │
│  │                                                          │  │
│  │  model_list:                                            │  │
│  │    - ollama/phi3:mini                                   │  │
│  │    - ollama/phi3:medium                                 │  │
│  │    - claude-3-5-sonnet-20240620                         │  │
│  │    - gpt-4o                                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└──┬──────────────────┬──────────────────┬───────────────────────┘
   │                  │                  │
   │ Model:           │ Model:           │ Model:
   │ ollama/*         │ claude-*         │ gpt-*
   │                  │                  │
   ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Ollama     │  │  Anthropic   │  │   OpenAI     │
│   Server     │  │     API      │  │     API      │
├──────────────┤  ├──────────────┤  ├──────────────┤
│ localhost:   │  │   Cloud      │  │   Cloud      │
│   11434      │  │   Service    │  │   Service    │
│              │  │              │  │              │
│ ┌──────────┐ │  │ Requires:    │  │ Requires:    │
│ │  Phi-3   │ │  │ ANTHROPIC_   │  │ OPENAI_      │
│ │  Mini    │ │  │ API_KEY      │  │ API_KEY      │
│ └──────────┘ │  │              │  │              │
│ ┌──────────┐ │  │              │  │              │
│ │  Phi-3   │ │  │              │  │              │
│ │  Medium  │ │  │              │  │              │
│ └──────────┘ │  │              │  │              │
│              │  │              │  │              │
│ FREE         │  │ PAID         │  │ PAID         │
│ LOCAL        │  │ CLOUD        │  │ CLOUD        │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Data Flow

### 1. User Sends Message

```
User types message
    ↓
ChatInput component
    ↓
handleSendMessage()
    ↓
useChatStore.addMessage({ role: "user", content })
    ↓
State updated → UI re-renders
```

### 2. API Request

```
sendChatMessage() in lib/api.ts
    ↓
Prepare request:
  {
    model: "ollama/phi3:mini",
    messages: [...history],
    temperature: 0.7,
    max_tokens: 2048,
    stream: true
  }
    ↓
POST http://localhost:11434/v1/chat/completions
```

### 3. LiteLLM Proxy Routes Request

```
LiteLLM receives request
    ↓
Checks model ID in config
    ↓
Routes to appropriate provider:
  • ollama/* → http://localhost:11434
  • claude-* → Anthropic API
  • gpt-*    → OpenAI API
    ↓
Transforms request to provider format
```

### 4. Provider Processes

```
Provider (Ollama/Anthropic/OpenAI)
    ↓
Generates response
    ↓
Streams back to LiteLLM
    ↓
LiteLLM transforms to OpenAI format
    ↓
Streams to frontend
```

### 5. Frontend Receives Stream

```
Response stream arrives
    ↓
lib/api.ts processes chunks:
  "data: {delta: {content: 'Hello'}}"
    ↓
onChunk callback
    ↓
updateLastMessage(content)
    ↓
Zustand updates state
    ↓
ChatMessage re-renders
    ↓
User sees text appear in real-time
```

## Component Hierarchy

```
App (page.tsx)
│
├─ Sidebar
│  │
│  ├─ Header (Logo + Title)
│  │
│  ├─ Model Selection
│  │  ├─ Phi-3 Mini Card
│  │  ├─ Phi-3 Medium Card
│  │  ├─ Claude 3.5 Card
│  │  └─ GPT-4o Card
│  │
│  ├─ System Prompt Textarea
│  │
│  ├─ Temperature Slider
│  │
│  ├─ Max Tokens Slider
│  │
│  └─ Clear Chat Button
│
└─ ChatContainer
   │
   ├─ Messages Area (scrollable)
   │  │
   │  └─ ChatMessage[] (map)
   │     ├─ User Avatar
   │     ├─ Message Content (Markdown)
   │     └─ Timestamp
   │
   ├─ Streaming Indicator
   │
   ├─ Error Display
   │
   └─ ChatInput
      ├─ Auto-resize Textarea
      └─ Send Button
```

## State Management (Zustand)

```typescript
useChatStore
│
├─ messages: Message[]
│  └─ { id, role, content, timestamp }
│
├─ settings: ChatSettings
│  ├─ model: string
│  ├─ temperature: number
│  ├─ maxTokens: number
│  └─ systemPrompt: string
│
├─ isStreaming: boolean
│
└─ Actions:
   ├─ addMessage()
   ├─ updateLastMessage()
   ├─ clearMessages()
   ├─ setSettings()
   └─ setIsStreaming()
```

## API Request Format

### Request to LiteLLM
```json
POST http://localhost:11434/v1/chat/completions

{
  "model": "ollama/phi3:mini",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful AI assistant."
    },
    {
      "role": "user",
      "content": "Hello!"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 2048,
  "stream": true
}
```

### Streaming Response
```
data: {"id":"123","choices":[{"delta":{"content":"Hello"}}]}

data: {"id":"123","choices":[{"delta":{"content":"!"}}]}

data: {"id":"123","choices":[{"delta":{"content":" How"}}]}

data: [DONE]
```

## File Dependencies

```
app/page.tsx
  ├─ imports components/Sidebar
  ├─ imports components/ChatContainer
  └─ imports app/globals.css

components/ChatContainer.tsx
  ├─ imports lib/store (useChatStore)
  ├─ imports lib/api (sendChatMessage)
  ├─ imports components/ChatMessage
  └─ imports components/ChatInput

components/Sidebar.tsx
  ├─ imports lib/store (useChatStore)
  ├─ imports lib/models (AVAILABLE_MODELS)
  └─ imports lib/utils (cn)

lib/api.ts
  ├─ imports lib/types (Message)
  └─ uses NEXT_PUBLIC_LITELLM_PROXY_URL

lib/store.ts
  ├─ imports zustand
  └─ imports lib/types (ChatState, Message)
```

## Security Flow

```
User's Browser
  ↓
  ✓ No API keys stored
  ✓ Only knows proxy URL
  ↓
LiteLLM Proxy
  ↓
  ✓ Reads API keys from environment
  ✓ Never exposes keys to frontend
  ✓ Validates requests
  ↓
Provider APIs
  ↓
  ✓ Authenticated with API keys
  ✓ Rate limiting applied
  ✓ Secure HTTPS connection
```

## Deployment Architecture

### Development
```
localhost:3000 (Next.js)
    ↓
localhost:11434 (LiteLLM)
    ↓
localhost:11434 (Ollama) + Cloud APIs
```

### Production
```
your-domain.com (Next.js on Vercel/etc)
    ↓
your-server.com:11434 (LiteLLM on VPS)
    ↓
your-server.com:11434 (Ollama) + Cloud APIs
```

---

This architecture provides:
- ✅ **Separation of Concerns**: UI, State, API, Providers
- ✅ **Scalability**: Easy to add new models
- ✅ **Security**: API keys never exposed to frontend
- ✅ **Flexibility**: Swap providers without changing frontend
- ✅ **Performance**: Streaming for real-time responses
- ✅ **Maintainability**: Clean, modular code structure
