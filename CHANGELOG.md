# Changelog

## [Latest]

### Added
- Support for `GEMINI_MODEL` environment variable to easily switch between different Gemini models
- Support for new Gemini 3 preview models (`gemini-3-pro-preview`, `gemini-3-flash-preview`)
- Comprehensive documentation for model selection and switching

### Changed
- Model selection is now configurable via environment variable instead of requiring code changes
- All tool handlers now use the `GEMINI_MODEL` environment variable
- Updated README with clearer model selection instructions
- Updated all MCP client integration examples to include `GEMINI_MODEL` configuration

### Improved
- Simplified model switching - no code changes needed
- Better documentation for using latest Gemini models
- More flexible configuration for different deployment scenarios

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

### Available Models

- `gemini-3-pro-preview` - Latest, most capable
- `gemini-3-flash-preview` - Latest, fast
- `gemini-2.5-flash` - Current default
- `gemini-2.5-pro` - Current, more capable
- `gemini-1.5-pro` - Previous generation
- `gemini-1.5-flash` - Previous generation, fast

### Default Behavior

If `GEMINI_MODEL` is not set, the server defaults to `gemini-2.5-flash`.
