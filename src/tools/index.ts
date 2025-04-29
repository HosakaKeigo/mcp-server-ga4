import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GA4Client } from "../ga4-client.js";
import type { IMCPTool } from "../types/index.js";
import { ActiveUsersTool } from "./active-users.js";
import { EventsTool } from "./events.js";
import { PageViewsTool } from "./page-views.js";
import { SourceMediaTool } from "./source-media.js";
import { UserBehaviorTool } from "./user-behavior.js";

/**
 * Tool registration function
 * Register all tools to the server
 */
export function registerTools(server: McpServer, ga4Client: GA4Client) {
	const ALL_TOOLS: IMCPTool[] = [
		new PageViewsTool(ga4Client),
		new ActiveUsersTool(ga4Client),
		new EventsTool(ga4Client),
		new UserBehaviorTool(ga4Client),
		new SourceMediaTool(ga4Client),
	];

	for (const tool of ALL_TOOLS) {
		server.tool(
			tool.name,
			tool.description,
			tool.parameters,
			tool.execute.bind(tool),
		);
	}
}
