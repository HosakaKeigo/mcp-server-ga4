import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { GA4Client } from "./ga4-client.js";
import { registerPrompts } from "./prompts/index.js";
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";

// サーバー情報
const SERVER_NAME = "mcp-server-ga4";
const SERVER_VERSION = "0.0.1";

/**
 * MCP GA4サーバーのメインクラス
 */
async function main() {
	try {
		// GA4クライアントの初期化
		const ga4Client = new GA4Client();

		// MCPサーバーのインスタンス作成
		const server = new McpServer({
			name: SERVER_NAME,
			version: SERVER_VERSION,
			capabilities: {
				resources: {},
				tools: {},
				prompts: {},
			},
		});

		// ツールの登録
		registerTools(server, ga4Client);

		// リソースの登録
		registerResources(server, ga4Client);

		// プロンプトの登録
		registerPrompts(server);

		// Stdioトランスポートの初期化と接続
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
