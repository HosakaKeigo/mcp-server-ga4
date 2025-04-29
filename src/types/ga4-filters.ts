import { z } from "zod";

/**
 * GA4 API filter definition
 * Reference: https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/FilterExpression
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
	MATCH_TYPE_UNSPECIFIED = "MATCH_TYPE_UNSPECIFIED",
	EXACT = "EXACT",
	BEGINS_WITH = "BEGINS_WITH",
	ENDS_WITH = "ENDS_WITH",
	CONTAINS = "CONTAINS",
	FULL_REGEXP = "FULL_REGEXP",
	PARTIAL_REGEXP = "PARTIAL_REGEXP",
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
	OPERATION_UNSPECIFIED = "OPERATION_UNSPECIFIED",
	EQUAL = "EQUAL",
	LESS_THAN = "LESS_THAN",
	LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
	GREATER_THAN = "GREATER_THAN",
	GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
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
 * Zod schema for simple filter format for MCP tools
 * Converts to GA4 API filter structure
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
	between: z
		.object({
			from: z.number(),
			to: z.number(),
		})
		.optional(),
	isEmpty: z.boolean().optional(),
});

export const simpleFilterSchema = z.object({
	dimension: z.array(dimensionSchema).optional(),
	metric: z.array(metricSchema).optional(),
	operator: z.enum(["AND", "OR"]).optional(),
});

/**
 * Simple filter format for MCP tools
 * Converts to GA4 API filter structure
 */
export type SimpleFilter = z.infer<typeof simpleFilterSchema>;

/**
 * Convert SimpleFilter to GA4 API FilterExpression
 */
export function convertToFilterExpression(
	filter: SimpleFilter,
): FilterExpression | undefined {
	if (!filter || (!filter.dimension?.length && !filter.metric?.length)) {
		return undefined;
	}

	// Create dimension filters
	const dimensionExpressions: FilterExpression[] = (filter.dimension || []).map(
		(dim) => {
			const filterObj: Filter = {
				fieldName: dim.name,
			};

			if (dim.stringEquals) {
				filterObj.stringFilter = {
					matchType: MatchType.EXACT,
					value: dim.stringEquals,
					caseSensitive: dim.caseSensitive,
				};
			} else if (dim.stringContains) {
				filterObj.stringFilter = {
					matchType: MatchType.CONTAINS,
					value: dim.stringContains,
					caseSensitive: dim.caseSensitive,
				};
			} else if (dim.stringBeginsWith) {
				filterObj.stringFilter = {
					matchType: MatchType.BEGINS_WITH,
					value: dim.stringBeginsWith,
					caseSensitive: dim.caseSensitive,
				};
			} else if (dim.stringEndsWith) {
				filterObj.stringFilter = {
					matchType: MatchType.ENDS_WITH,
					value: dim.stringEndsWith,
					caseSensitive: dim.caseSensitive,
				};
			} else if (dim.stringRegex) {
				filterObj.stringFilter = {
					matchType: MatchType.FULL_REGEXP,
					value: dim.stringRegex,
					caseSensitive: dim.caseSensitive,
				};
			} else if (dim.inList && dim.inList.length > 0) {
				filterObj.inListFilter = {
					values: dim.inList,
					caseSensitive: dim.caseSensitive,
				};
			} else if (dim.isEmpty) {
				filterObj.emptyFilter = {};
			}

			return { filter: filterObj };
		},
	);

	// Create metric filters
	const metricExpressions: FilterExpression[] = (filter.metric || []).map(
		(met) => {
			const filterObj: Filter = {
				fieldName: met.name,
			};

			if (met.equals !== undefined) {
				filterObj.numericFilter = {
					operation: Operation.EQUAL,
					value: { doubleValue: met.equals },
				};
			} else if (met.lessThan !== undefined) {
				filterObj.numericFilter = {
					operation: Operation.LESS_THAN,
					value: { doubleValue: met.lessThan },
				};
			} else if (met.lessThanOrEqual !== undefined) {
				filterObj.numericFilter = {
					operation: Operation.LESS_THAN_OR_EQUAL,
					value: { doubleValue: met.lessThanOrEqual },
				};
			} else if (met.greaterThan !== undefined) {
				filterObj.numericFilter = {
					operation: Operation.GREATER_THAN,
					value: { doubleValue: met.greaterThan },
				};
			} else if (met.greaterThanOrEqual !== undefined) {
				filterObj.numericFilter = {
					operation: Operation.GREATER_THAN_OR_EQUAL,
					value: { doubleValue: met.greaterThanOrEqual },
				};
			} else if (met.between !== undefined) {
				filterObj.betweenFilter = {
					fromValue: { doubleValue: met.between.from },
					toValue: { doubleValue: met.between.to },
				};
			} else if (met.isEmpty) {
				filterObj.emptyFilter = {};
			}

			return { filter: filterObj };
		},
	);

	// Combine all expressions
	const allExpressions = [...dimensionExpressions, ...metricExpressions];

	if (allExpressions.length === 0) {
		return undefined;
	}

	if (allExpressions.length === 1) {
		return allExpressions[0];
	}

	// Combine multiple filters (default is AND)
	const operator = filter.operator === "OR" ? "orGroup" : "andGroup";
	return {
		[operator]: {
			expressions: allExpressions,
		},
	};
}
