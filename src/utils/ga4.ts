import type { google } from "@google-analytics/data/build/protos/protos.js";
import { z } from "zod";

/**
 * Format GA4 API response for MCP response
 * @param response GA4 API response
 * @param limit Limit on the number of rows to return (optional)
 * @param offset Starting position (optional)
 */
export function formatGAResponse(
	response: google.analytics.data.v1beta.IRunReportResponse,
	limit?: number,
	offset = 0,
) {
	if (!response || !response.rows) {
		return { data: [], totalCount: 0, limit, offset };
	}

	const dimensionHeaders =
		response.dimensionHeaders?.map((header) => header.name) || [];
	const metricHeaders =
		response.metricHeaders?.map((header) => header.name) || [];

	const totalCount = response.rows.length;
	const paginatedRows = limit
		? response.rows.slice(offset, offset + limit)
		: response.rows.slice(offset);

	const rows = paginatedRows.map((row) => {
		const result: Record<string, any> = {};

		// Process dimensions
		if (row.dimensionValues) {
			row.dimensionValues.forEach((value, index) => {
				if (dimensionHeaders[index]) {
					result[dimensionHeaders[index]] = value.value;
				}
			});
		}

		// Process metrics
		if (row.metricValues) {
			row.metricValues.forEach((value, index) => {
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
 * Date format validation (YYYY-MM-DD)
 */
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
	message: "Date must be in YYYY-MM-DD format",
});

/**
 * Base Zod schema for filters
 */
export const filterSchema = z
	.object({
		dimension: z
			.array(
				z.object({
					name: z.string(),
					stringEquals: z.string().optional(),
					stringContains: z.string().optional(),
					stringBeginsWith: z.string().optional(),
					stringEndsWith: z.string().optional(),
					stringRegex: z.string().optional(),
					inList: z.array(z.string()).optional(),
					isEmpty: z.boolean().optional(),
					caseSensitive: z.boolean().optional().default(false),
				}),
			)
			.optional(),
		metric: z
			.array(
				z.object({
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
				}),
			)
			.optional(),
		operator: z.enum(["AND", "OR"]).optional().default("AND"),
	})
	.optional();

/**
 * Schema for pagination parameters
 */
export const paginationSchema = z.object({
	limit: z.number().min(1).max(1000).optional().default(50),
	offset: z.number().min(0).optional().default(0),
});

/**
 * Validation schema for page view queries
 */
export const pageViewsSchema = z.object({
	startDate: dateSchema,
	endDate: dateSchema,
	dimensions: z.array(z.string()).optional().default(["hostName"]),
	limit: z.number().min(1).max(1000).optional().default(50),
	offset: z.number().min(0).optional().default(0),
	filter: filterSchema,
});

/**
 * Validation schema for active user queries
 */
export const activeUsersSchema = z.object({
	startDate: dateSchema,
	endDate: dateSchema,
	limit: z.number().min(1).max(1000).optional().default(50),
	offset: z.number().min(0).optional().default(0),
	filter: filterSchema,
});

/**
 * Validation schema for event queries
 */
export const eventsSchema = z.object({
	startDate: dateSchema,
	endDate: dateSchema,
	eventName: z.string().optional(),
	limit: z.number().min(1).max(1000).optional().default(50),
	offset: z.number().min(0).optional().default(0),
	filter: filterSchema,
});

/**
 * Validation schema for user behavior queries
 */
export const userBehaviorSchema = z.object({
	startDate: dateSchema,
	endDate: dateSchema,
	limit: z.number().min(1).max(1000).optional().default(50),
	offset: z.number().min(0).optional().default(0),
	filter: filterSchema,
});

/**
 * Validation schema for source media queries
 */
export const sourceMediaSchema = z.object({
	startDate: dateSchema,
	endDate: dateSchema,
	limit: z.number().min(1).max(1000).optional().default(50),
	offset: z.number().min(0).optional().default(0),
	filter: filterSchema,
});
