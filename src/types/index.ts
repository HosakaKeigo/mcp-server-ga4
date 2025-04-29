import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import type { z } from "zod";

/**
 * Utility type to extract types from Zod schemas
 */
export type InferZodParams<T extends Record<string, z.ZodType>> = {
	[K in keyof T]: T[K] extends z.ZodOptional<infer U>
			? z.infer<U> | undefined
			: T[K] extends z.ZodDefault<infer V>
			? z.infer<V>
			: z.infer<T[K]>;
};

/**
 * Interface for MCP tools
 */
export interface IMCPTool<
	TParams extends Record<string, z.ZodType> = Record<string, z.ZodType>,
> {
	/**
	 * Tool name
	 */
	readonly name: string;

	/**
	 * Tool description
	 */
	readonly description: string;

	/**
	 * Parameter definitions
	 */
	readonly parameters: TParams;

	/**
	 * Execute the tool
	 * @param args Parameters
	 * @returns Execution result
	 */
	execute(args: InferZodParams<TParams>): Promise<{
		content: TextContent[];
		isError?: boolean;
	}>;
}

/**
 * Interface for MCP resources
 */
export interface IMCPResource {
	/**
	 * Resource name
	 */
	readonly name: string;

	/**
	 * Resource URI
	 */
	readonly uri: string;

	/**
	 * Resource handler
	 */
	handler(uri: URL): Promise<{
		contents: {
			uri: string;
			text?: string;
			blob?: string;
			mimeType?: string;
		}[];
	}>;
}

/**
 * Interface for MCP prompts
 */
export interface IMCPPrompt<
	TParams extends Record<string, z.ZodType> = Record<string, z.ZodType>,
> {
	/**
	 * Prompt name
	 */
	readonly name: string;

	/**
	 * Parameter definitions
	 */
	readonly schema: TParams;

	/**
	 * Prompt handler
	 */
	handler(args: InferZodParams<TParams>): {
		messages: {
			role: "user" | "assistant";
			content: TextContent;
		}[];
	};
}
