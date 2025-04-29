import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GA4Client } from "../ga4-client.js";
import { DimensionsResource } from "./dimensions.js";
import { FiltersHelpResource } from "./filters-help.js";
import { MetricsResource } from "./metrics.js";
import { PropertyInfoResource } from "./property-info.js";

/**
 * Resource registration function
 * Register all resources to the server
 */
export function registerResources(server: McpServer, ga4Client: GA4Client) {
	const ALL_RESOURCES = [
		new PropertyInfoResource(ga4Client),
		new DimensionsResource(),
		new FiltersHelpResource(),
		new MetricsResource(),
	];

	for (const resource of ALL_RESOURCES) {
		server.resource(
			resource.name,
			resource.uri,
			resource.handler.bind(resource),
		);
	}
}
