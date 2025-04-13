import { z } from 'zod';
import { IMCPPrompt } from '../types/index.js';

/**
 * ディメンション選択プロンプトのスキーマ型
 */
const selectDimensionsSchema = {
  metricType: z.enum(['pageviews', 'users', 'events', 'behavior']).describe('Type of metrics to analyze'),
  businessGoal: z.string().describe('Business goal for the analysis'),
};

/**
 * ディメンション選択プロンプト定義
 */
export function selectDimensionsPrompt(): IMCPPrompt<typeof selectDimensionsSchema> {
  return {
    name: 'select-dimensions',
    schema: selectDimensionsSchema,
    handler: ({ metricType, businessGoal }) => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I'm analyzing Google Analytics 4 data focusing on ${metricType} to achieve my business goal of "${businessGoal}". Please help me select the most relevant dimensions to include in my analysis, explaining why each dimension is important and how it relates to my goal. Provide a list of 3-5 recommended dimensions with justification for each.`,
            },
          },
        ],
      };
    }
  };
}
