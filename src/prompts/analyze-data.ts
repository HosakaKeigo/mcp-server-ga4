import { z } from 'zod';

/**
 * データ分析プロンプト定義
 */
export function analyzeDataPrompt() {
  return {
    name: 'analyze-data',
    schema: {
      metricType: z.enum(['pageviews', 'users', 'events', 'behavior']).describe('Type of metrics to analyze'),
      startDate: z.string().describe('Start date in YYYY-MM-DD format'),
      endDate: z.string().describe('End date in YYYY-MM-DD format'),
    },
    handler: ({ metricType, startDate, endDate }) => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I need you to analyze Google Analytics 4 data for my website from ${startDate} to ${endDate}, focusing on ${metricType}. Please provide insights on trends, anomalies, and potential opportunities for improvement. Format your analysis in a clear, structured way with bullet points for key findings.`,
            },
          },
        ],
      };
    }
  };
}
