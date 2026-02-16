# SEO Performance Hub

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/seo-performance-hub-ai-powered-analytics-platform)

A full-stack AI-powered SEO analysis and performance optimization hub built on Cloudflare Workers. Leverage advanced AI models, web search tools, and multi-session chat interfaces to analyze websites, generate SEO reports, track performance metrics, and get actionable recommendations—all deployed globally with zero infrastructure management.

## ✨ Key Features

- **Multi-Session AI Chat**: Persistent conversations across sessions with Durable Objects for stateful agents.
- **Tool-Enhanced AI**: Built-in tools for web search (SerpAPI), weather (demo), and extensible MCP (Model Context Protocol) integrations.
- **Streaming Responses**: Real-time, low-latency chat with token-by-token streaming.
- **Model Flexibility**: Switch between models like Gemini 2.5 Flash/Pro via Cloudflare AI Gateway.
- **Session Management**: Create, list, update, and delete sessions with automatic title generation.
- **Modern UI**: Responsive React frontend with shadcn/ui, Tailwind CSS, and theme support (light/dark).
- **Production-Ready**: Error handling, logging, CORS, health checks, and client error reporting.
- **Edge Deployment**: Global CDN delivery, Durable Objects for state, and Workers for backend routing.

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Query, Lucide Icons, Sonner (toasts).
- **Backend**: Cloudflare Workers, Hono, Agents SDK (Durable Objects), OpenAI SDK, MCP SDK.
- **Tools**: SerpAPI (web search), Cloudflare AI Gateway (models), MCP for external tools.
- **Dev Tools**: Bun (package manager), Wrangler (deployment), ESLint, TypeScript.
- **State**: Cloudflare Durable Objects (ChatAgent, AppController).

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed.
- Cloudflare account with [AI Gateway](https://developers.cloudflare.com/ai-gateway/) configured.
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-update/) installed (`bunx wrangler` works too).

### Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd seo-performance-hub-yfhiu4l3qoqixgbk932o8
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Configure environment variables in `wrangler.jsonc`:
   ```json
   "vars": {
     "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
     "CF_AI_API_KEY": "{your-ai-gateway-token}",
     "SERPAPI_KEY": "{your-serpapi-key}",
     "OPENROUTER_API_KEY": "{optional-openrouter-key}"
   }
   ```
   - Get AI Gateway details from [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - SerpAPI key from [serpapi.com](https://serpapi.com/) (optional for web_search tool).

4. Generate Worker types:
   ```
   bun run cf-typegen
   ```

### Development
```
bun dev
```
- Opens at `http://localhost:3000` (or `$PORT`).
- Hot reload for frontend; Worker proxy for API routes.
- Edit `src/pages/HomePage.tsx` for UI, `worker/userRoutes.ts` or agents for backend.

### Build for Production
```
bun run build
```
Outputs static assets to `dist/`.

## 📖 Usage

### Chat Interface
- Send messages: `/api/chat/{sessionId}/chat` (POST `{ message: "..." }`).
- List sessions: `GET /api/sessions`.
- Create session: `POST /api/sessions` `{ title: "...", firstMessage: "..." }`.
- Switch models: `POST /api/chat/{sessionId}/model` `{ model: "google-ai-studio/gemini-2.5-flash" }`.

### Tools
- **web_search**: Searches Google via SerpAPI (`{ query: "SEO best practices" }`).
- **get_weather**: Demo tool (replace with real API).
- **Custom MCP Tools**: Add via `worker/mcp-client.ts`.

### Frontend Hooks
Uses `src/lib/chat.ts` for session/chat management:
```tsx
import { chatService } from '@/lib/chat';
await chatService.sendMessage('Analyze my site');
```

## ☁️ Deployment

Deploy to Cloudflare Workers in seconds:

1. Connect to Cloudflare:
   ```
   wrangler login
   wrangler whoami
   ```

2. Deploy:
   ```
   bun run deploy
   ```
   Or `npx wrangler deploy`.

3. Custom domain (optional):
   Update `wrangler.jsonc` with `routes` and deploy.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/seo-performance-hub-ai-powered-analytics-platform)

Your app will be live at `https://{name}.{account_id}.workers.dev` with global edge network.

## 🔧 Customization

- **UI**: Replace `src/pages/HomePage.tsx`. Use shadcn components (`npx shadcn@latest add <component>`).
- **Backend Routes**: Extend `worker/userRoutes.ts`.
- **Agents**: Modify `worker/agent.ts` or add tools in `worker/tools.ts`.
- **Tools/MCP**: Configure `worker/mcp-client.ts` with MCP servers.
- **Models**: Update `src/lib/chat.ts` MODELS array.

## 🐛 Troubleshooting

- **Types errors**: Run `bun run cf-typegen`.
- **AI Gateway 401**: Verify `CF_AI_API_KEY` and Gateway URL.
- **No SerpAPI**: Web search falls back to Google link.
- **Logs**: Check Cloudflare Dashboard > Workers > Logs.
- **Client errors**: Auto-reported to `/api/client-errors`.

## 🤝 Contributing

1. Fork & clone.
2. `bun install && bun dev`.
3. Make changes, test locally.
4. PR with clear description.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)
- Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/seo-performance-hub-yfhiu4l3qoqixgbk932o8/issues)

Built with ❤️ by Cloudflare Workers Templates.