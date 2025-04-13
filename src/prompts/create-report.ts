import { z } from 'zod';
import { IMCPPrompt, InferZodParams } from '../types/index.js';

/**
 * レポート生成プロンプトクラス
 */
export class CreateReportPrompt implements IMCPPrompt {
  /**
   * プロンプト名
   */
  readonly name = 'create-report';

  /**
   * プロンプトスキーマ
   */
  readonly schema = {
    title: z.string().describe('Report title'),
    metrics: z.string().describe('Comma-separated metrics to include in the report'),
    startDate: z.string().describe('Start date in YYYY-MM-DD format'),
    endDate: z.string().describe('End date in YYYY-MM-DD format'),
    audienceType: z.string().describe('Target audience for the report'),
  } as const;

  /**
   * プロンプトハンドラー
   */
  handler(args: InferZodParams<typeof this.schema>) {
    const { title, metrics, startDate, endDate, audienceType } = args;
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Please create a comprehensive ${audienceType}-friendly Google Analytics report titled "${title}" covering the period from ${startDate} to ${endDate}. The report should focus on the following metrics: ${metrics}. Include an executive summary, detailed analysis of each metric, visualizations, and actionable recommendations.`,
          },
        },
      ],
    };
  }
}
