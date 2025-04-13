import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import type { GA4Client } from "../ga4-client.js";
import { type SimpleFilter, simpleFilterSchema } from "../types/ga4-filters.js";
import type { IMCPTool, InferZodParams } from "../types/index.js";
import { activeUsersSchema, formatGAResponse } from "../utils/ga4.js";
import { handleError } from "../utils/error-handler.js";

/**
 * アクティブユーザー取得ツールクラス
 */
export class ActiveUsersTool implements IMCPTool {
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
  readonly name = "get-active-users";

  /**
   * ツールの説明
   */
  readonly description =
    "Get active and new users metrics for a specific date range";

  /**
   * パラメータ定義
   */
  readonly parameters = {
    startDate: z.string().describe("Start date in YYYY-MM-DD format"),
    endDate: z.string().describe("End date in YYYY-MM-DD format"),
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
      const { startDate, endDate, limit = 50, offset = 0, filter } = args;

      // 入力パラメータの検証
      const validParams = activeUsersSchema.parse({
        startDate,
        endDate,
        limit,
        offset,
        filter,
      });

      // GA4からデータ取得
      const response = await this.ga4Client.getActiveUsers(
        validParams.startDate,
        validParams.endDate,
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
