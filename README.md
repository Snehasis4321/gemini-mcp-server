# Gemini MCP Server

A Model Context Protocol (MCP) server that integrates Google's Gemini API with AI assistants like Claude Desktop, Kiro, Cursor, VS Code, and other MCP-compatible clients.

## Features

- **Chat**: Multi-turn conversations with Gemini models
- **Search**: Query information using Gemini's knowledge
- **Analyze**: Analyze code, text, or data with AI-powered insights
- **Generate**: Generate code, documentation, and creative content
- **Latest Models**: Support for Gemini 3 preview models (gemini-3-pro-preview, gemini-3-flash-preview)

## Prerequisites

- Node.js v20 or later
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

## Installation

### 1. Clone or Download

```bash
git clone <your-repo-url>
cd gemini-mcp-server
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key" or "Get API Key"
3. Copy your API key for use in the configuration steps below

## Integration with MCP Clients

### Kiro

Add this to your Kiro MCP configuration file:

**Location**: `~/.kiro/settings/mcp.json` (user-level) or `.kiro/settings/mcp.json` (workspace-level)

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-2.5-flash"
      },
      "disabled": false,
      "autoApprove": ["chat", "search", "analyze", "generate"]
    }
  }
}
```

**Note**: Replace `/absolute/path/to/gemini-mcp-server` with the actual path on your system. You can optionally set `GEMINI_MODEL` to use a different model (e.g., `gemini-3-pro-preview`).

After adding the configuration:
1. Open Kiro's MCP Server view in the feature panel
2. Click "Reconnect" on the gemini server, or restart Kiro


### Claude Desktop

Add this to your Claude Desktop configuration file:

**Location**: 
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-2.5-flash"
      }
    }
  }
}
```

After adding the configuration:
1. Restart Claude Desktop completely (quit and reopen)
2. Look for the 🔌 icon in the bottom right to verify the server is connected
3. You can now use Gemini tools in your conversations

### Cursor

Add this to your Cursor MCP configuration file:

**Location**: 
- macOS: `~/Library/Application Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- Windows: `%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
- Linux: `~/.config/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-2.5-flash"
      }
    }
  }
}
```

After adding the configuration:
1. Restart Cursor
2. Open the Cline extension
3. The Gemini tools should now be available

### VS Code (with Cline/Claude Dev Extension)

Add this to your VS Code MCP configuration file:

**Location**: 
- macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- Windows: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
- Linux: `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-2.5-flash"
      }
    }
  }
}
```

After adding the configuration:
1. Reload VS Code window (Cmd/Ctrl + Shift + P → "Developer: Reload Window")
2. Open the Cline/Claude Dev extension
3. The Gemini tools should now be available

### Other MCP Clients

For any other MCP-compatible client, use the standard MCP server configuration format:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/absolute/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-2.5-flash"
      }
    }
  }
}
```

Refer to your specific client's documentation for the exact configuration file location. You can optionally set `GEMINI_MODEL` to use a different model.

## Available Tools

### chat

Send messages to Gemini with optional conversation history for multi-turn conversations.

**Parameters:**
- `message` (string, required): The message to send to Gemini
- `conversationHistory` (array, optional): Previous messages in the conversation
  - Format: `[{role: "user"|"model", content: "message text"}]`

**Example:**
```javascript
{
  "message": "What is React?",
  "conversationHistory": [
    {"role": "user", "content": "Hello!"},
    {"role": "model", "content": "Hi! How can I help you today?"}
  ]
}
```

### search

Search for information using Gemini's knowledge base.

**Parameters:**
- `query` (string, required): The search query

**Example:**
```javascript
{
  "query": "What are the latest features in Gemini 2.0?"
}
```

### analyze

Analyze content with AI-powered insights.

**Parameters:**
- `content` (string, required): The content to analyze
- `analysisType` (string, required): Type of analysis
  - Options: `code`, `text`, `data`, `general`

**Example:**
```javascript
{
  "content": "function add(a, b) { return a + b; }",
  "analysisType": "code"
}
```

### generate

Generate content based on a prompt.

**Parameters:**
- `prompt` (string, required): The generation prompt
- `contentType` (string, required): Type of content to generate
  - Options: `code`, `documentation`, `creative`, `technical`

**Example:**
```javascript
{
  "prompt": "Create a React component for a todo list",
  "contentType": "code"
}
```

## Testing the Server

You can test the server directly using Node.js:

```bash
# Set your API key
export GEMINI_API_KEY="your_api_key_here"

# Run the server
node src/index.js
```

The server will start and listen on stdio. You should see:
```
Gemini MCP Server running on stdio
```

## Development

Run in watch mode for development:

```bash
npm run dev
```

This will automatically restart the server when you make changes to the code.

## Configuration Options

### Model Selection

By default, the server uses `gemini-2.5-flash`. To use a different model, set the `GEMINI_MODEL` environment variable in your MCP configuration:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-3-pro-preview"
      }
    }
  }
}
```

Available models:

**Latest (Recommended)**
- `gemini-3-pro-preview` - Latest generation, most capable (preview)
- `gemini-3-flash-preview` - Latest generation, fast and efficient (preview)

**Current Generation**
- `gemini-2.5-flash` - Fast and efficient (default)
- `gemini-2.5-pro` - More capable, slower

**Previous Generation**
- `gemini-1.5-pro` - Previous generation, capable
- `gemini-1.5-flash` - Previous generation, fast

**Note**: Preview models (gemini-3-*) are experimental and may have breaking changes. Use production models for stable deployments.

### Switching to Gemini 3 Models

To use the latest Gemini 3 preview models, simply set the `GEMINI_MODEL` environment variable in your MCP configuration:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-3-pro-preview"
      }
    }
  }
}
```

Or for the fast variant:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["/path/to/gemini-mcp-server/src/index.js"],
      "env": {
        "GEMINI_API_KEY": "your_api_key_here",
        "GEMINI_MODEL": "gemini-3-flash-preview"
      }
    }
  }
}
```

No code changes needed - the server automatically uses the model specified in the environment variable!

### Environment Variables

- `GEMINI_API_KEY` (required): Your Google Gemini API key
- `GEMINI_MODEL` (optional): The Gemini model to use (default: `gemini-2.5-flash`)
  - Examples: `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-pro`, `gemini-1.5-pro`

## Troubleshooting

### API Key Error

**Error**: `Error: GEMINI_API_KEY environment variable is not set`

**Solution**: Ensure your API key is properly set in the MCP configuration file under the `env` section.

### Import Error

**Error**: `SyntaxError: The requested module '@google/genai' does not provide an export named 'genai'`

**Solution**: This has been fixed in the latest version. Make sure you're using the correct import:
```javascript
import { GoogleGenAI } from "@google/genai";
```

### Connection Closed Error

**Error**: `MCP error -32000: Connection closed`

**Solution**: 
1. Check that Node.js v20+ is installed: `node --version`
2. Verify all dependencies are installed: `npm install`
3. Check that the path in your MCP config is absolute and correct
4. Look at the server logs for more details

### Server Not Showing Up

**Solution**:
1. Verify the configuration file path is correct for your client
2. Ensure the JSON syntax is valid (no trailing commas, proper quotes)
3. Restart your MCP client completely
4. Check the client's logs for error messages

### Rate Limiting

If you encounter rate limiting errors from the Gemini API:
1. Check your API quota in [Google AI Studio](https://aistudio.google.com/)
2. Implement exponential backoff in your requests
3. Consider upgrading your API plan if needed

## API Limits

Free tier limits (as of 2025):
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

For higher limits, check [Google AI Studio pricing](https://ai.google.dev/pricing).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Google AI Studio](https://aistudio.google.com/)

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [MCP documentation](https://modelcontextprotocol.io/)
- Visit [Google AI Studio](https://aistudio.google.com/) for API-related questions
