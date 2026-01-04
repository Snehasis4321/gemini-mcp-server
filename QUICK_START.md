# Quick Start Guide

Get your Gemini MCP Server running in 5 minutes!

## Step 1: Get API Key

Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key.

## Step 2: Install Dependencies

```bash
cd gemini-mcp-server
npm install
```

## Step 3: Configure Your Client

Choose your client and add the configuration:

### Kiro
Edit `~/.kiro/settings/mcp.json`:
```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {"GEMINI_API_KEY": "YOUR_KEY_HERE"},
      "disabled": false,
      "autoApprove": ["chat", "search", "analyze", "generate", "knowledge"]
    }
  }
}
```

### Claude Desktop
Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):
```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {"GEMINI_API_KEY": "YOUR_KEY_HERE"}
    }
  }
}
```

### Cursor / VS Code
Edit the Cline settings file at:
- macOS: `~/Library/Application Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {"GEMINI_API_KEY": "YOUR_KEY_HERE"}
    }
  }
}
```

## Step 4: Restart Your Client

- **Kiro**: Reconnect the MCP server or restart
- **Claude Desktop**: Quit and reopen
- **Cursor/VS Code**: Reload window

## Step 5: Test It!

Try asking your AI assistant:
- "Use Gemini to search for the latest JavaScript features" (real-time web search)
- "Use Gemini knowledge to explain React concepts" (knowledge base)
- "Analyze this code with Gemini"
- "Generate a React component using Gemini"

## Available Tools

- `chat` - Multi-turn conversations
- `search` - Real-time web search with Google Search
- `knowledge` - Query Gemini's knowledge base (training data)
- `analyze` - Code/text/data analysis
- `generate` - Content generation

## Using Latest Models

The server supports the new Gemini 3 preview models! To use them:

1. Edit `src/index.js` and change the model name:
```javascript
model: "gemini-3-pro-preview" // or "gemini-3-flash-preview"
```

2. Or set an environment variable in your MCP config:
```json
"env": {
  "GEMINI_API_KEY": "YOUR_KEY_HERE",
  "GEMINI_MODEL": "gemini-3-pro-preview"
}
```

Available models:
- `gemini-3-pro-preview` - Latest, most capable
- `gemini-3-flash-preview` - Latest, fast
- `gemini-2.5-flash` - Current default
- `gemini-2.5-pro` - Current, more capable

## Troubleshooting

**Server not connecting?**
1. Check the path is absolute (starts with `/` on macOS/Linux or `C:\` on Windows)
2. Verify your API key is correct
3. Ensure Node.js v20+ is installed: `node --version`
4. Check client logs for errors

**Need help?** See the full [README.md](./README.md) for detailed documentation.
