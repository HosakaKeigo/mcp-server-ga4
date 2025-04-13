import { z } from 'zod';
import { eventsSchema } from '../utils.js';
import { GA4Client } from '../ga4-client.js';
import { formatGAResponse } from '../utils.js';
import { SimpleFilter } from '../types/ga4-filters.js';
import { IMCPTool } from '../types/index.js';

/**
 * イベントのZodスキーマ型
 */
const eventsParamsSchema = {
  startDate: z.string().describe('Start date in YYYY-MM-DD format'),
  endDate: z.string().describe('End date in YYYY-MM-DD format'),
  eventName: z.string().describe('Specific event name to filter by (optional)').optional(),
  limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
  offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
  filter: z.any().describe('Filter conditions to apply (optional)').optional(),
};

/**
 * イベント取得ツール定義
 */
export function eventsTool(ga4Client: GA4Client): IMCPTool<typeof eventsParamsSchema> {
  return {
    name: 'get-events',
    description: 'Get event metrics for a specific date range',
    schema: eventsParamsSchema,
    handler: async ({ startDate, endDate, eventName, limit = 50, offset = 0, filter }) => {
      try {
        // 入力パラメータの検証
        const validParams = eventsSchema.parse({ startDate, endDate, eventName, limit, offset, filter });
        
        // GA4からデータ取得
        const response = await ga4Client.getEvents(
          validParams.startDate,
          validParams.endDate,
          validParams.eventName,
          validParams.limit,
          validParams.offset,
          validParams.filter as SimpleFilter
        );
        
        // レスポンスのフォーマット
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
  };
}
