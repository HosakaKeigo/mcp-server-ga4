import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import type { GA4Client } from "../ga4-client.js";
import { type SimpleFilter, simpleFilterSchema } from "../types/ga4-filters.js";
import type { IMCPTool, InferZodParams } from "../types/index.js";
import { eventsSchema } from "../utils.js";
import { formatGAResponse } from "../utils.js";

/**
 * イベント取得ツールクラス
 */
export class EventsTool implements IMCPTool {
	/**
	 * GA4クライアントインスタンス
	 */
	private ga4Client: GA4Client;

	/**
	 * コンストラクタ
	 * @param ga4Client GA4クライアントインスタンス
	 */
	constructor(ga4Client: GA4Client) {
		this.ga4Client = ga4Client;
	}

	/**
	 * ツール名
	 */
	readonly name = "get-events";

	/**
	 * ツールの説明
	 */
	readonly description = "Get event metrics for a specific date range";

	/**
	 * パラメータ定義
	 */
	readonly parameters = {
		startDate: z.string().describe("Start date in YYYY-MM-DD format"),
		endDate: z.string().describe("End date in YYYY-MM-DD format"),
		eventName: z
			.string()
			.describe("Specific event name to filter by (optional)")
			.optional(),
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
	 * ツール実行メソッド
	 */
	async execute(args: InferZodParams<typeof this.parameters>): Promise<{
		content: TextContent[];
		isError?: boolean;
	}> {
		try {
			const {
				startDate,
				endDate,
				eventName,
				limit = 50,
				offset = 0,
				filter,
			} = args;

			// 入力パラメータの検証
			const validParams = eventsSchema.parse({
				startDate,
				endDate,
				eventName,
				limit,
				offset,
				filter,
			});

			// GA4からデータ取得
			const response = await this.ga4Client.getEvents(
				validParams.startDate,
				validParams.endDate,
				validParams.eventName,
				validParams.limit,
				validParams.offset,
				validParams.filter as SimpleFilter,
			);

			// レスポンスのフォーマット
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
		} catch (error: any) {
			console.error("GA4 events error:", error);

			const errorDetails = {
				message: error.message,
				stack: error.stack,
				details: error.details || "No details",
				code: error.code,
				status: error.status,
			};

			return {
				content: [
					{
						type: "text",
						text: `Error: ${error.message}\nDetails: ${JSON.stringify(errorDetails, null, 2)}`,
					},
				],
				isError: true,
			};
		}
	}
}
