import { z } from 'zod';

/**
 * GA4 API フィルター定義
 * 参照: https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/FilterExpression
 */

export type FilterExpression = {
  andGroup?: FilterExpressionList;
  orGroup?: FilterExpressionList;
  notExpression?: FilterExpression;
  filter?: Filter;
};

export type FilterExpressionList = {
  expressions: FilterExpression[];
};

export type Filter = {
  fieldName: string;
  stringFilter?: StringFilter;
  inListFilter?: InListFilter;
  numericFilter?: NumericFilter;
  betweenFilter?: BetweenFilter;
  emptyFilter?: EmptyFilter;
};

export type StringFilter = {
  matchType: MatchType;
  value: string;
  caseSensitive?: boolean;
};

export enum MatchType {
  MATCH_TYPE_UNSPECIFIED = 'MATCH_TYPE_UNSPECIFIED',
  EXACT = 'EXACT',
  BEGINS_WITH = 'BEGINS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  CONTAINS = 'CONTAINS',
  FULL_REGEXP = 'FULL_REGEXP',
  PARTIAL_REGEXP = 'PARTIAL_REGEXP'
}

export type InListFilter = {
  values: string[];
  caseSensitive?: boolean;
};

export type NumericFilter = {
  operation: Operation;
  value: NumericValue;
};

export enum Operation {
  OPERATION_UNSPECIFIED = 'OPERATION_UNSPECIFIED',
  EQUAL = 'EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL'
}

export type NumericValue = {
  int64Value?: string;
  doubleValue?: number;
};

export type BetweenFilter = {
  fromValue: NumericValue;
  toValue: NumericValue;
};

export type EmptyFilter = Record<string, never>;

/**
 * MCPツール向け簡易フィルター形式のZodスキーマ
 * GA4 APIフィルター構造に変換されます
 */
export const dimensionSchema = z.object({
  name: z.string(),
  stringEquals: z.string().optional(),
  stringContains: z.string().optional(),
  stringBeginsWith: z.string().optional(),
  stringEndsWith: z.string().optional(),
  stringRegex: z.string().optional(),
  inList: z.array(z.string()).optional(),
  isEmpty: z.boolean().optional(),
  caseSensitive: z.boolean().optional(),
});

export const metricSchema = z.object({
  name: z.string(),
  equals: z.number().optional(),
  lessThan: z.number().optional(),
  lessThanOrEqual: z.number().optional(),
  greaterThan: z.number().optional(),
  greaterThanOrEqual: z.number().optional(),
  between: z.object({
    from: z.number(),
    to: z.number(),
  }).optional(),
  isEmpty: z.boolean().optional(),
});

export const simpleFilterSchema = z.object({
  dimension: z.array(dimensionSchema).optional(),
  metric: z.array(metricSchema).optional(),
  operator: z.enum(['AND', 'OR']).optional(),
});

/**
 * MCPツール向け簡易フィルター形式
 * GA4 APIフィルター構造に変換されます
 */
export type SimpleFilter = z.infer<typeof simpleFilterSchema>;


/**
 * SimpleFilterをGA4 API FilterExpressionに変換
 */
export function convertToFilterExpression(filter: SimpleFilter): FilterExpression | undefined {
  if (!filter || (!filter.dimension?.length && !filter.metric?.length)) {
    return undefined;
  }

  // ディメンションフィルターの作成
  const dimensionExpressions: FilterExpression[] = (filter.dimension || []).map(dim => {
    const filterObj: Filter = {
      fieldName: dim.name
    };

    if (dim.stringEquals) {
      filterObj.stringFilter = {
        matchType: MatchType.EXACT,
        value: dim.stringEquals,
        caseSensitive: dim.caseSensitive
      };
    } else if (dim.stringContains) {
      filterObj.stringFilter = {
        matchType: MatchType.CONTAINS,
        value: dim.stringContains,
        caseSensitive: dim.caseSensitive
      };
    } else if (dim.stringBeginsWith) {
      filterObj.stringFilter = {
        matchType: MatchType.BEGINS_WITH,
        value: dim.stringBeginsWith,
        caseSensitive: dim.caseSensitive
      };
    } else if (dim.stringEndsWith) {
      filterObj.stringFilter = {
        matchType: MatchType.ENDS_WITH,
        value: dim.stringEndsWith,
        caseSensitive: dim.caseSensitive
      };
    } else if (dim.stringRegex) {
      filterObj.stringFilter = {
        matchType: MatchType.FULL_REGEXP,
        value: dim.stringRegex,
        caseSensitive: dim.caseSensitive
      };
    } else if (dim.inList && dim.inList.length > 0) {
      filterObj.inListFilter = {
        values: dim.inList,
        caseSensitive: dim.caseSensitive
      };
    } else if (dim.isEmpty) {
      filterObj.emptyFilter = {};
    }

    return { filter: filterObj };
  });

  // メトリックフィルターの作成
  const metricExpressions: FilterExpression[] = (filter.metric || []).map(met => {
    const filterObj: Filter = {
      fieldName: met.name
    };

    if (met.equals !== undefined) {
      filterObj.numericFilter = {
        operation: Operation.EQUAL,
        value: { doubleValue: met.equals }
      };
    } else if (met.lessThan !== undefined) {
      filterObj.numericFilter = {
        operation: Operation.LESS_THAN,
        value: { doubleValue: met.lessThan }
      };
    } else if (met.lessThanOrEqual !== undefined) {
      filterObj.numericFilter = {
        operation: Operation.LESS_THAN_OR_EQUAL,
        value: { doubleValue: met.lessThanOrEqual }
      };
    } else if (met.greaterThan !== undefined) {
      filterObj.numericFilter = {
        operation: Operation.GREATER_THAN,
        value: { doubleValue: met.greaterThan }
      };
    } else if (met.greaterThanOrEqual !== undefined) {
      filterObj.numericFilter = {
        operation: Operation.GREATER_THAN_OR_EQUAL,
        value: { doubleValue: met.greaterThanOrEqual }
      };
    } else if (met.between !== undefined) {
      filterObj.betweenFilter = {
        fromValue: { doubleValue: met.between.from },
        toValue: { doubleValue: met.between.to }
      };
    } else if (met.isEmpty) {
      filterObj.emptyFilter = {};
    }

    return { filter: filterObj };
  });

  // すべての式を結合
  const allExpressions = [...dimensionExpressions, ...metricExpressions];

  if (allExpressions.length === 0) {
    return undefined;
  }

  if (allExpressions.length === 1) {
    return allExpressions[0];
  }

  // 複数のフィルターを結合（デフォルトはAND）
  const operator = filter.operator === 'OR' ? 'orGroup' : 'andGroup';
  return {
    [operator]: {
      expressions: allExpressions
    }
  };
}
