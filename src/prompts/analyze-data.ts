import { z } from "zod";
import type { IMCPPrompt, InferZodParams } from "../types/index.js";

/**
 * データ分析プロンプトクラス
 */
export class AnalyzeDataPrompt implements IMCPPrompt {
	/**
	 * プロンプト名
	 */
	readonly name = "analyze-data";

	/**
	 * プロンプトスキーマ
	 */
	readonly schema = {
		metricType: z
			.enum(["pageviews", "users", "events", "behavior"])
			.describe("Type of metrics to analyze"),
		startDate: z.string().describe("Start date in YYYY-MM-DD format"),
		endDate: z.string().describe("End date in YYYY-MM-DD format"),
	} as const;

	/**
	 * プロンプトハンドラー
	 */
	handler(args: InferZodParams<typeof this.schema>) {
		const { metricType, startDate, endDate } = args;
		return {
			messages: [
				{
					role: "user" as const,
					content: {
						type: "text" as const,
						text: `I need you to analyze Google Analytics 4 data for my website from ${startDate} to ${endDate}, focusing on ${metricType}. Please provide insights on trends, anomalies, and potential opportunities for improvement. Format your analysis in a clear, structured way with bullet points for key findings.`,
					},
				},
			],
		};
	}
}
