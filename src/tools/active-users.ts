import { z } from 'zod';
import { activeUsersSchema } from '../utils.js';
import { GA4Client } from '../ga4-client.js';
import { formatGAResponse } from '../utils.js';
import { SimpleFilter } from '../types/ga4-filters.js';

/**
 * アクティブユーザー取得ツール定義
 */
export function activeUsersTool(ga4Client: GA4Client) {
  return {
    name: 'get-active-users',
    description: 'Get active and new users metrics for a specific date range',
    schema: {
      startDate: z.string().describe('Start date in YYYY-MM-DD format'),
      endDate: z.string().describe('End date in YYYY-MM-DD format'),
      limit: z.number().describe('Maximum number of results to return (default: 50)').optional().default(50),
      offset: z.number().describe('Offset for pagination (default: 0)').optional().default(0),
      filter: z.any().describe('Filter conditions to apply (optional)').optional(),
    },
    handler: async ({ startDate, endDate, limit = 50, offset = 0, filter }) => {
      try {
        const validParams = activeUsersSchema.parse({ startDate, endDate, limit, offset, filter });
        
        const response = await ga4Client.getActiveUsers(
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
  };
}
