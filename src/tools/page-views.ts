import { z } from 'zod';
import { pageViewsSchema } from '../utils.js';
import { GA4Client } from '../ga4-client.js';
import { formatGAResponse } from '../utils.js';
import { SimpleFilter } from '../types/ga4-filters.js';
import { IMCPTool } from '../types/index.js';

/**
 * ページビューのZodスキーマ型
 */
const pageViewsParamsSchema = {
  startDate: z.string().describe('Start date in YYYY-MM-DD format'),
  endDate: z.string().describe('End date in YYYY-MM-DD format'),
  dimensions: z.array(z.string()).describe('Dimensions to group by (e.g., page, country)').optional().default(['hostName']),
  limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
  offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
  filter: z.any().describe('Filter conditions to apply (optional)').optional(),
};

/**
 * ページビュー取得ツール定義
 */
export function pageViewsTool(ga4Client: GA4Client): IMCPTool<typeof pageViewsParamsSchema> {
  return {
    name: 'get-page-views',
    description: 'Get page view metrics for a specific date range',
    schema: pageViewsParamsSchema,
    handler: async ({ startDate, endDate, dimensions = ['hostName'], limit = 50, offset = 0, filter }) => {
      try {
        console.error(`Executing get-page-views with params:`, { startDate, endDate, dimensions, limit, offset });
        
        // 入力パラメータの検証
        const validParams = pageViewsSchema.parse({ startDate, endDate, dimensions, limit, offset, filter });
        
        // GA4からデータ取得
        const response = await ga4Client.getPageViews(
          validParams.startDate, 
          validParams.endDate, 
          validParams.dimensions,
          validParams.limit,
          validParams.offset,
          validParams.filter as SimpleFilter
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
  };
}
