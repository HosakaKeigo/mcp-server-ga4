import { z } from "zod";
import type { IMCPPrompt, InferZodParams } from "../types/index.js";

/**
 * Dimension selection prompt class
 */
export class SelectDimensionsPrompt implements IMCPPrompt {
	/**
	 * Prompt name
	 */
	readonly name = "select-dimensions";

	/**
	 * Prompt schema
	 */
	readonly schema = {
		metricType: z
			.enum(["pageviews", "users", "events", "behavior"])
			.describe("Type of metrics to analyze"),
		businessGoal: z.string().describe("Business goal for the analysis"),
	} as const;

	/**
	 * Prompt handler
	 */
	handler(args: InferZodParams<typeof this.schema>) {
		const { metricType, businessGoal } = args;
		return {
			messages: [
				{
					role: "user" as const,
					content: {
						type: "text" as const,
						text: `I'm analyzing Google Analytics 4 data focusing on ${metricType} to achieve my business goal of "${businessGoal}". Please help me select the most relevant dimensions to include in my analysis, explaining why each dimension is important and how it relates to my goal. Provide a list of 3-5 recommended dimensions with justification for each.`,
					},
				},
			],
		};
	}
}
