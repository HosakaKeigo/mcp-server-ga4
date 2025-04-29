import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import type { GA4Client } from "../ga4-client.js";
import { type SimpleFilter, simpleFilterSchema } from "../types/ga4-filters.js";
import type { IMCPTool, InferZodParams } from "../types/index.js";
import { handleError } from "../utils/error-handler.js";
import { formatGAResponse, pageViewsSchema } from "../utils/ga4.js";

/**
 * Page Views Retrieval Tool Class
 */
export class PageViewsTool implements IMCPTool {
	/**
	 * GA4 client instance
	 */
	private ga4Client: GA4Client;

	/**
	 * Constructor
	 * @param ga4Client GA4 client instance
	 */
	constructor(ga4Client: GA4Client) {
		this.ga4Client = ga4Client;
	}

	/**
	 * Tool name
	 */
	readonly name = "get-page-views";

	/**
	 * Tool description
	 */
	readonly description = "Get page view metrics for a specific date range";

	/**
	 * Parameter definitions
	 */
	readonly parameters = {
		startDate: z.string().describe("Start date in YYYY-MM-DD format"),
		endDate: z.string().describe("End date in YYYY-MM-DD format"),
		dimensions: z
			.array(z.string())
			.describe("Dimensions to group by (e.g., page, country)")
			.optional()
			.default(["hostName"]),
		limit: z
			.number()
			.describe("Maximum number of results to return (default: 50)")
			.optional()
			.default(50),
		offset: z
			.number()
			.describe("Offset for pagination (default: 0)")
			.optional()
			.default(0),
		filter: simpleFilterSchema
			.describe("Filter conditions to apply (optional)")
			.optional(),
	} as const;

	/**
	 * Tool execution method
	 */
	async execute(args: InferZodParams<typeof this.parameters>): Promise<{
		content: TextContent[];
		isError?: boolean;
	}> {
		try {
			const {
				startDate,
				endDate,
				dimensions = ["hostName"],
				limit = 50,
				offset = 0,
				filter,
			} = args;

			console.error("Executing get-page-views with params:", {
				startDate,
				endDate,
				dimensions,
				limit,
				offset,
			});

			// Validate input parameters
			const validParams = pageViewsSchema.parse({
				startDate,
				endDate,
				dimensions,
				limit,
				offset,
				filter,
			});

			// Retrieve data from GA4
			const response = await this.ga4Client.getPageViews(
				validParams.startDate,
				validParams.endDate,
				validParams.dimensions,
				validParams.limit,
				validParams.offset,
				validParams.filter as SimpleFilter,
			);

			// Format the response
			const formattedResponse = formatGAResponse(
				response,
				validParams.limit,
				validParams.offset,
			);

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(formattedResponse, null, 2),
					},
				],
			};
		} catch (error) {
			const { message, details } = handleError(error);
			return {
				content: [
					{
						type: "text",
						text: `Error: ${message}\nDetails: ${details}`,
					},
				],
				isError: true,
			};
		}
	}
}
