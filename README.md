# MCP Server for Google Analytics 4
## Key Features

This server provides the following MCP functionalities:

### Tools

*   `get-page-views`: Fetches page view metrics for a specified date range.
*   `get-active-users`: Fetches active user metrics for a specified date range.
*   `get-events`: Fetches event metrics for a specified date range.
*   `get-user-behavior`: Fetches user behavior metrics such as session duration and bounce rate.

### Resources

*   `ga4://property-info`: Metadata for the GA4 property including available dimensions, metrics and comparisons.

The followings are more lightweight resources.

*   `ga4://dimensions`: List of available GA4 dimensions.
*   `ga4://filters-help`: Help documentation on using GA4 filters.
*   `ga4://metrics`: List of available GA4 metrics.

### Prompts

*   `analyze-data`: Data analysis assistant.
*   `create-report`: Report generation template.
*   `select-dimensions`: Assists in selecting appropriate dimensions for analysis goals.

## Setup

### Prerequisites

*   A Google Analytics 4 property.
*   A Google Cloud service account with access to the GA4 API.
*   Node.js 20 or higher.
*   pnpm package manager.

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-server-ga4.git
cd mcp-server-ga4

# Install dependencies using pnpm
pnpm install

# Create the .env file
cp .env.example .env

# Edit the .env file and set your credentials
# GOOGLE_CLIENT_EMAIL=your-service-account-email@example.iam.gserviceaccount.com
# GOOGLE_PRIVATE_KEY=your-private-key
# GA_PROPERTY_ID=your-ga4-property-id
```

### Auth
If `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` are set, the server will authenticate with the service account. If not, it will use the default credentials.

Make sure your project enables the **Google Analytics API** and that your service account has the necessary permissions.（`https://www.googleapis.com/auth/analytics.readonly`）

Here's how to set up Google Application Default Credentials:

1. Install the Google Cloud SDK.
2. Run the following command to authenticate:

```bash
gcloud auth application-default login --scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly

# If you want to set a quota project
gcloud auth application-default set-quota-project <my-quota-project>
```

### Build and Run

```bash
# Build the server
pnpm run build

# Run the server
pnpm start
```

## Usage

### Integration with Claude for Desktop

Add the following to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "ga4": {
      "command": "node",
      "args": ["/path/to/mcp-server-ga4/dist/index.js"],
      "env": {
        "GOOGLE_PROJECT_ID": "your-project-id",
        "GOOGLE_CLIENT_EMAIL": "your-service-account-email@example.iam.gserviceaccount.com",
        "GOOGLE_PRIVATE_KEY": "your-private-key",
        "GA_PROPERTY_ID": "your-ga4-property-id"
      }
    }
  }
}
```

If you want to use the default credentials, set `GOOGLE_APPLICATION_CREDENTIALS` in your environment:

```json
{
  "mcpServers": {
    "ga4": {
      "command": "node",
      "args": ["/path/to/mcp-server-ga4/dist/index.js"],
      "env": {
        "GOOGLE_PROJECT_ID": "your-project-id",
        "GA_PROPERTY_ID": "your-ga4-property-id",
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/your/credentials.json"
      }
    }
  }
}
```

### Filtering

You can use the `filter` parameter with all tools to narrow down results:

```json
{
  "dimension": [
    {
      "name": "pagePath",
      "stringEquals": "/blog/article-1"
    }
  ],
  "metric": [
    {
      "name": "screenPageViews",
      "greaterThan": 100
    }
  ],
  "operator": "AND"
}
```

### Pagination

When dealing with large amounts of data, use the `limit` and `offset` parameters:

```
// First page (items 1-50)
get-page-views with limit=50, offset=0

// Second page (items 51-100)
get-page-views with limit=50, offset=50
```

## Troubleshooting

*   **Authentication errors**: Check your service account key and permissions.
*   **No data showing**: Verify the date range and property ID are correct.
*   **Connection errors**: Check your network settings and firewall.

## Testing

Test using the MCP Inspector:

```bash
pnpm dlx @modelcontextprotocol/inspector node /path/to/mcp-server-ga4/dist/index.js
```
*(Note: `pnpm dlx` is the equivalent of `npx` for executing packages)*

## License

MIT

## Thanks
- https://github.com/lapras-inc/lapras-mcp-server/tree/main
  - Owes to a class based structure of mcp implementation.
- https://github.com/ruchernchong/mcp-server-google-analytics
  - Relies on basic implementation of Google Analytics API.
