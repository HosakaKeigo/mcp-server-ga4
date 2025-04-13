import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { GA4Client } from './ga4-client.js';
import { GA4_DIMENSIONS } from './resources/ga4-dimensions.js';
import {
  formatGAResponse,
  pageViewsSchema,
  activeUsersSchema,
  eventsSchema,
  userBehaviorSchema
} from './utils.js';

// サーバー情報
const SERVER_NAME = 'mcp-server-ga4';
const SERVER_VERSION = '1.0.0';

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

    // ===== ツール定義 =====

    /**
     * ページビュー取得ツール
     * 特定の日付範囲でのページビュー指標を取得
     */
    server.tool(
      'get-page-views',
      'Get page view metrics for a specific date range',
      {
        startDate: z.string().describe('Start date in YYYY-MM-DD format'),
        endDate: z.string().describe('End date in YYYY-MM-DD format'),
        dimensions: z.array(z.string()).describe('Dimensions to group by (e.g., page, country)').optional().default(['hostName']),
        limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
        offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
      },
      async ({ startDate, endDate, dimensions = ['hostName'], limit = 50, offset = 0 }) => {
        try {
          console.error(`Executing get-page-views with params:`, { startDate, endDate, dimensions, limit, offset });

          // 入力パラメータの検証
          const validParams = pageViewsSchema.parse({ startDate, endDate, dimensions, limit, offset });

          // GA4からデータ取得
          const response = await ga4Client.getPageViews(
            validParams.startDate,
            validParams.endDate,
            validParams.dimensions,
            validParams.limit,
            validParams.offset
          );

          // レスポンスのフォーマット - クライアントサイドでページネーション適用
          const formattedResponse = formatGAResponse(response, validParams.limit, validParams.offset);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(formattedResponse, null, 2),
              },
            ],
          };
        } catch (error: any) {
          console.error('GA4 page views error:', error);

          // エラーオブジェクトの詳細情報を取得
          const errorDetails = {
            message: error.message,
            stack: error.stack,
            details: error.details || 'No details',
            code: error.code,
            status: error.status,
            metadata: error.metadata ? JSON.stringify(error.metadata) : 'No metadata'
          };

          return {
            content: [
              {
                type: 'text',
                text: `Error: ${error.message}\nDetails: ${JSON.stringify(errorDetails, null, 2)}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    /**
     * アクティブユーザー取得ツール
     * アクティブユーザーと新規ユーザーの指標を取得
     */
    server.tool(
      'get-active-users',
      'Get active and new users metrics for a specific date range',
      {
        startDate: z.string().describe('Start date in YYYY-MM-DD format'),
        endDate: z.string().describe('End date in YYYY-MM-DD format'),
        limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
        offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
      },
      async ({ startDate, endDate, limit = 50, offset = 0 }) => {
        try {
          const validParams = activeUsersSchema.parse({ startDate, endDate, limit, offset });

          const response = await ga4Client.getActiveUsers(
            validParams.startDate,
            validParams.endDate,
            validParams.limit,
            validParams.offset
          );

          const formattedResponse = formatGAResponse(response, validParams.limit, validParams.offset);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(formattedResponse, null, 2),
              },
            ],
          };
        } catch (error: any) {
          console.error('GA4 active users error:', error);

          const errorDetails = {
            message: error.message,
            stack: error.stack,
            details: error.details || 'No details',
            code: error.code,
            status: error.status,
          };

          return {
            content: [
              {
                type: 'text',
                text: `Error: ${error.message}\nDetails: ${JSON.stringify(errorDetails, null, 2)}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    /**
     * イベント取得ツール
     * 特定の日付範囲でのイベント指標を取得
     */
    server.tool(
      'get-events',
      'Get event metrics for a specific date range',
      {
        startDate: z.string().describe('Start date in YYYY-MM-DD format'),
        endDate: z.string().describe('End date in YYYY-MM-DD format'),
        eventName: z.string().describe('Specific event name to filter by (optional)').optional(),
        limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
        offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
      },
      async ({ startDate, endDate, eventName, limit = 50, offset = 0 }) => {
        try {
          const validParams = eventsSchema.parse({ startDate, endDate, eventName, limit, offset });

          const response = await ga4Client.getEvents(
            validParams.startDate,
            validParams.endDate,
            validParams.eventName,
            validParams.limit,
            validParams.offset
          );

          const formattedResponse = formatGAResponse(response, validParams.limit, validParams.offset);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(formattedResponse, null, 2),
              },
            ],
          };
        } catch (error: any) {
          console.error('GA4 events error:', error);

          const errorDetails = {
            message: error.message,
            stack: error.stack,
            details: error.details || 'No details',
            code: error.code,
            status: error.status,
          };

          return {
            content: [
              {
                type: 'text',
                text: `Error: ${error.message}\nDetails: ${JSON.stringify(errorDetails, null, 2)}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    /**
     * ユーザー行動分析ツール
     * セッション時間、直帰率などの指標を取得
     */
    server.tool(
      'get-user-behavior',
      'Get user behavior metrics like session duration and bounce rate',
      {
        startDate: z.string().describe('Start date in YYYY-MM-DD format'),
        endDate: z.string().describe('End date in YYYY-MM-DD format'),
        limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
        offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
      },
      async ({ startDate, endDate, limit = 50, offset = 0 }) => {
        try {
          const validParams = userBehaviorSchema.parse({ startDate, endDate, limit, offset });

          const response = await ga4Client.getUserBehavior(
            validParams.startDate,
            validParams.endDate,
            validParams.limit,
            validParams.offset
          );

          const formattedResponse = formatGAResponse(response, validParams.limit, validParams.offset);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(formattedResponse, null, 2),
              },
            ],
          };
        } catch (error: any) {
          console.error('GA4 user behavior error:', error);

          const errorDetails = {
            message: error.message,
            stack: error.stack,
            details: error.details || 'No details',
            code: error.code,
            status: error.status,
          };

          return {
            content: [
              {
                type: 'text',
                text: `Error: ${error.message}\nDetails: ${JSON.stringify(errorDetails, null, 2)}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // ===== リソース定義 =====

    /**
     * GA4プロパティ情報リソース
     * GA4プロパティのメタデータを提供
     */
    server.resource(
      'ga4-property',
      'ga4://property-info',
      async (uri) => {
        try {
          const metadata = await ga4Client.getPropertyMetadata();
          return {
            contents: [
              {
                uri: uri.href,
                text: JSON.stringify(metadata, null, 2),
                mimeType: 'application/json',
              },
            ],
          };
        } catch (error: any) {
          throw new Error(`Failed to get GA4 property information: ${error.message}`);
        }
      }
    );

    /**
     * GA4ディメンション一覧リソース
     * GA4で利用可能なディメンション一覧を提供
     */
    server.resource(
      'ga4-dimensions',
      'ga4://dimensions',
      async (uri) => {
        try {
          return {
            contents: [
              {
                uri: uri.href,
                text: GA4_DIMENSIONS,
                mimeType: 'text/markdown',
              },
            ],
          };
        } catch (error: any) {
          throw new Error(`Failed to get GA4 dimensions: ${error.message}`);
        }
      }
    );

    //// ===== プロンプト定義 =====

    ///**
    // * データ分析プロンプト
    // * GA4データの分析を支援するプロンプト
    // */
    //server.prompt(
    //  'analyze-data',
    //  {
    //    metricType: z.enum(['pageviews', 'users', 'events', 'behavior']).describe('Type of metrics to analyze'),
    //    startDate: z.string().describe('Start date in YYYY-MM-DD format'),
    //    endDate: z.string().describe('End date in YYYY-MM-DD format'),
    //  },
    //  ({ metricType, startDate, endDate }) => {
    //    return {
    //      messages: [
    //        {
    //          role: 'user',
    //          content: {
    //            type: 'text',
    //            text: `I need you to analyze Google Analytics 4 data for my website from ${startDate} to ${endDate}, focusing on ${metricType}. Please provide insights on trends, anomalies, and potential opportunities for improvement. Format your analysis in a clear, structured way with bullet points for key findings.`,
    //          },
    //        },
    //      ],
    //    };
    //  }
    //);

    ///**
    // * レポート生成プロンプト
    // * GA4データからレポートを作成するためのプロンプト
    // */
    //server.prompt(
    //  'create-report',
    //  {
    //    title: z.string().describe('Report title'),
    //    metrics: z.string().describe('Comma-separated metrics to include in the report'),
    //    startDate: z.string().describe('Start date in YYYY-MM-DD format'),
    //    endDate: z.string().describe('End date in YYYY-MM-DD format'),
    //    audienceType: z.string().describe('Target audience for the report'),
    //  },
    //  ({ title, metrics, startDate, endDate, audienceType }) => {
    //    return {
    //      messages: [
    //        {
    //          role: 'user',
    //          content: {
    //            type: 'text',
    //            text: `Please create a comprehensive ${audienceType}-friendly Google Analytics report titled "${title}" covering the period from ${startDate} to ${endDate}. The report should focus on the following metrics: ${metrics}. Include an executive summary, detailed analysis of each metric, visualizations, and actionable recommendations.`,
    //          },
    //        },
    //      ],
    //    };
    //  }
    //);

    // Stdioトランスポートの初期化と接続
    const transport = new StdioServerTransport();
    console.error(`${SERVER_NAME} v${SERVER_VERSION} starting...`);
    await server.connect(transport);
    console.error(`${SERVER_NAME} connected and ready`);

  } catch (error) {
    console.error('Fatal error initializing server:', error);
    process.exit(1);
  }
}

// メイン関数の実行
main();
