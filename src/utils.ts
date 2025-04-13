import { z } from 'zod';

/**
 * MCP レスポンス用にGA4 APIのレスポンスをフォーマット
 * @param response GA4 APIレスポンス
 * @param limit 返却行数の制限（オプション）
 * @param offset 開始位置（オプション）
 */
export function formatGAResponse(response: any, limit?: number, offset: number = 0) {
  if (!response || !response.rows) {
    return { data: [], totalCount: 0, limit, offset };
  }

  const dimensionHeaders = response.dimensionHeaders?.map((header: any) => header.name) || [];
  const metricHeaders = response.metricHeaders?.map((header: any) => header.name) || [];

  // ページネーションの適用
  const totalCount = response.rows.length;
  const paginatedRows = limit
    ? response.rows.slice(offset, offset + limit)
    : response.rows.slice(offset);

  const rows = paginatedRows.map((row: any) => {
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
    totalCount,
    limit: limit || null,
    offset,
    hasMore: limit ? offset + limit < totalCount : false,
    pageCount: limit ? Math.ceil(totalCount / limit) : 1,
    currentPage: limit ? Math.floor(offset / limit) + 1 : 1,
  };
}

/**
 * 日付形式バリデーション (YYYY-MM-DD)
 */
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: 'Date must be in YYYY-MM-DD format',
});

/**
 * ページネーションパラメータのスキーマ
 */
export const paginationSchema = z.object({
  limit: z.number().min(1).max(1000).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});

/**
 * ページビュークエリのバリデーションスキーマ
 */
export const pageViewsSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  dimensions: z.array(z.string()).optional().default(['hostName']),
  limit: z.number().min(1).max(1000).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});

/**
 * アクティブユーザークエリのバリデーションスキーマ
 */
export const activeUsersSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  limit: z.number().min(1).max(1000).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});

/**
 * イベントクエリのバリデーションスキーマ
 */
export const eventsSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  eventName: z.string().optional(),
  limit: z.number().min(1).max(1000).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});

/**
 * ユーザー行動クエリのバリデーションスキーマ
 */
export const userBehaviorSchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  limit: z.number().min(1).max(1000).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});
