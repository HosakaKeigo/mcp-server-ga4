import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { IMCPPrompt } from "../types/index.js";
import { AnalyzeDataPrompt } from "./analyze-data.js";
import { CreateReportPrompt } from "./create-report.js";
import { SelectDimensionsPrompt } from "./select-dimensions.js";

/**
 * Prompt registration function
 * Register all prompts to the server
 */
export function registerPrompts(server: McpServer) {
	const ALL_PROMPTS: IMCPPrompt[] = [
		new AnalyzeDataPrompt(),
		new CreateReportPrompt(),
		new SelectDimensionsPrompt(),
	];
	for (const prompt of ALL_PROMPTS) {
		server.prompt(prompt.name, prompt.handler.bind(prompt));
	}
}
