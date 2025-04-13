import { z } from 'zod';
import { userBehaviorSchema } from '../utils.js';
import { GA4Client } from '../ga4-client.js';
import { formatGAResponse } from '../utils.js';
import { SimpleFilter } from '../types/ga4-filters.js';

/**
 * ユーザー行動分析ツール定義
 */
export function userBehaviorTool(ga4Client: GA4Client): {
  return {
  name: 'get-user-behavior',
  description: 'Get user behavior metrics like session duration and bounce rate',
  schema: {
    startDate: z.string().describe('Start date in YYYY-MM-DD format'),
    endDate: z.string().describe('End date in YYYY-MM-DD format'),
    limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
    offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
    filter: z.any().describe('Filter conditions to apply (optional)').optional(),
  },
  handler: async ({ startDate, endDate, limit = 50, offset = 0, filter }) => {
    try {
      const validParams = userBehaviorSchema.parse({ startDate, endDate, limit, offset, filter });

      const response = await ga4Client.getUserBehavior(
        validParams.startDate,
        validParams.endDate,
        validParams.limit,
        validParams.offset,
        validParams.filter as SimpleFilter
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
};
}
