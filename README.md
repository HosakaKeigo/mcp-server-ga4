# MCP Server for Google Analytics 4

Model Context Protocol (MCP) server for integrating with Google Analytics 4 data.

## Features

This server provides the following MCP capabilities:

### Tools
- `get-page-views`: Get page view metrics for a specific date range
- `get-active-users`: Get active users metrics for a specific date range
- `get-events`: Get event metrics for a specific date range
- `get-user-behavior`: Get user behavior metrics like session duration and bounce rate

### Resources
- `ga4://property-info`: GA4 property metadata

### Prompts
- `analyze-data`: Data analysis assistant prompt
- `create-report`: Report generation template

## Setup

### Prerequisites

1. A Google Analytics 4 property
2. A Google Cloud service account with access to the GA4 API
3. Node.js 18 or higher

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```
4. Configure your environment variables in `.env`:
   ```
   GOOGLE_CLIENT_EMAIL=your-service-account-email@example.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=your-private-key
   GA_PROPERTY_ID=your-ga4-property-id
   ```

### Build and Run

Build the server:
```bash
npm run build
```

Run the server:
```bash
npm start
```

## Using with Claude for Desktop

Add this server to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ga4": {
      "command": "node",
      "args": ["/path/to/mcp-server-ga4/dist/index.js"],
      "env": {
        "GOOGLE_CLIENT_EMAIL": "your-service-account-email@example.iam.gserviceaccount.com",
        "GOOGLE_PRIVATE_KEY": "your-private-key",
        "GA_PROPERTY_ID": "your-ga4-property-id"
      }
    }
  }
}
```

## Testing

You can test this server with the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node /path/to/mcp-server-ga4/dist/index.js
```

## License

MIT
