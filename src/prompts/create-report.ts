import { z } from 'zod';

/**
 * レポート生成プロンプト定義
 */
export function createReportPrompt() {
  return {
    name: 'create-report',
    schema: {
      title: z.string().describe('Report title'),
      metrics: z.string().describe('Comma-separated metrics to include in the report'),
      startDate: z.string().describe('Start date in YYYY-MM-DD format'),
      endDate: z.string().describe('End date in YYYY-MM-DD format'),
      audienceType: z.string().describe('Target audience for the report'),
    },
    handler: ({ title, metrics, startDate, endDate, audienceType }) => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please create a comprehensive ${audienceType}-friendly Google Analytics report titled "${title}" covering the period from ${startDate} to ${endDate}. The report should focus on the following metrics: ${metrics}. Include an executive summary, detailed analysis of each metric, visualizations, and actionable recommendations.`,
            },
          },
        ],
      };
    }
  };
}
