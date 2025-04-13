import { z } from 'zod';

/**
 * MCP レスポンス用にGA4 APIのレスポンスをフォーマット
 */
export function formatGAResponse(response: any) {
  if (!response || !response.rows) {
    return { data: [] };
  }

  const dimensionHeaders = response.dimensionHeaders?.map((header: any) => header.name) || [];
  const metricHeaders = response.metricHeaders?.map((header: any) => header.name) || [];
  
  const rows = response.rows.map((row: any) => {
    const result: Record<string, any> = {};
    
    // ディメンションの処理
    if (row.dimensionValues) {
      row.dimensionValues.forEach((value: any, index: number) => {
        if (dimensionHeaders[index]) {
          result[dimensionHeaders[index]] = value.value;
        }
      });
    }
    
    // メトリクスの処理
    if (row.metricValues) {
      row.metricValues.forEach((value: any, index: number) => {
        if (metricHeaders[index]) {
          result[metricHeaders[index]] = value.value;
        }
      });
    }
    
    return result;
  });

  return {
    data: rows,
    dimensionHeaders,
    metricHeaders,
    rowCount: response.rowCount,
  };
}

/**
 * 日付形式バリデーション (YYYY-MM-DD)
 */
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: 'Date must be in YYYY-MM-DD format',
});

/**
 * ページビュークエリのバリデーションスキーマ
 */
export const pageViewsSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  dimensions: z.array(z.string()).optional().default(['page']),
});

/**
 * アクティブユーザークエリのバリデーションスキーマ
 */
export const activeUsersSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
});

/**
 * イベントクエリのバリデーションスキーマ
 */
export const eventsSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  eventName: z.string().optional(),
});

/**
 * ユーザー行動クエリのバリデーションスキーマ
 */
export const userBehaviorSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
});
