import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GA4Client } from "./ga4-client.js";
import { registerPrompts } from "./prompts/index.js";
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";

/**
 * Main class for the MCP GA4 server
 */
async function main() {
	const SERVER_NAME = "mcp-server-ga4";
	const SERVER_VERSION = "1.0.0";

	try {
		// Initialize GA4 client
		const ga4Client = new GA4Client();

		// Create an instance of the MCP server
		const server = new McpServer({
			name: SERVER_NAME,
			version: SERVER_VERSION,
			capabilities: {
				resources: {},
				tools: {},
				prompts: {},
			},
		});

		// Register tools
		registerTools(server, ga4Client);

		// Register resources
		registerResources(server, ga4Client);

		// Register prompts
		registerPrompts(server);

		// Initialize and connect Stdio transport
		const transport = new StdioServerTransport();
		console.error(`${SERVER_NAME} v${SERVER_VERSION} starting...`);
		await server.connect(transport);
		console.error(`${SERVER_NAME} connected and ready`);
	} catch (error) {
		console.error("Fatal error initializing server:", error);
		process.exit(1);
	}
}

main();
