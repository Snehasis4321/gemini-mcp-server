# Changelog

## [Latest]

### Added
- **Real Web Search**: Added true web search capabilities using Google Search integration
- **Knowledge Tool**: New dedicated tool for querying Gemini's knowledge base without web search
- Support for `GEMINI_MODEL` environment variable to easily switch between different Gemini models
- Support for new Gemini 3 preview models (`gemini-3-pro-preview`, `gemini-3-flash-preview`)
- Comprehensive documentation for model selection and switching
- Fallback mechanism: web search falls back to knowledge base if unavailable

### Changed
- **Search tool**: Now performs real-time web search instead of just using training data
- Model selection is now configurable via environment variable instead of requiring code changes
- All tool handlers now use the `GEMINI_MODEL` environment variable
- Updated README with clearer model selection instructions and new tool descriptions
- Updated all MCP client integration examples to include `GEMINI_MODEL` and `knowledge` tool

### Improved
- Real-time information access through web search
- Clear distinction between web search and knowledge base queries
- Simplified model switching - no code changes needed
- Better documentation for using latest Gemini models
- More flexible configuration for different deployment scenarios
- Robust error handling with fallback mechanisms

## How to Use New Features

### Switch Models Without Code Changes

Simply set the `GEMINI_MODEL` environment variable in your MCP configuration:

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

### Available Tools

- `search` - Real-time web search using Google Search
- `knowledge` - Query Gemini's knowledge base (training data only)
- `chat` - Multi-turn conversations
- `analyze` - Code/text/data analysis
- `generate` - Content generation

### Default Behavior

If `GEMINI_MODEL` is not set, the server defaults to `gemini-2.5-flash`.
