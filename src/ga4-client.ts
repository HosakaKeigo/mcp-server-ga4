import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { google } from "@google-analytics/data/build/protos/protos.js";
import dotenv from "dotenv";
import {
	type SimpleFilter,
	convertToFilterExpression,
} from "./types/ga4-filters.js";

dotenv.config();

/**
 * Class for initializing and managing the GA4 data client
 */
export class GA4Client {
	private client: BetaAnalyticsDataClient;
	private propertyId: string;

	/**
	 * Constructor for the GA4 client
	 * Retrieves authentication information and property ID from environment variables
	 */
	constructor() {
		const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
		const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
		this.propertyId = process.env.GA_PROPERTY_ID || "";
		const projectId = process.env.GOOGLE_PROJECT_ID;

		if (!this.propertyId || !projectId) {
			console.error("Missing required environment variables:");
			console.error("- GA_PROPERTY_ID:", this.propertyId ? "Set" : "Missing");
			console.error("- GOOGLE_PROJECT_ID:", projectId ? "Set" : "Missing");
			throw new Error(
				"Missing required environment variables for GA4 client. Please check .env file.",
			);
		}

		try {
			if (clientEmail && privateKey) {
				this.client = new BetaAnalyticsDataClient({
					projectId,
					credentials: {
						client_email: clientEmail,
						private_key: privateKey,
					},
				})
			} else {
				console.error(`Missing credentials for GA4 client. Falling back to default credentials. Project ID: ${projectId}`);
				// fallback to application default credentials
				this.client = new BetaAnalyticsDataClient({
					projectId,
				});
			}
			console.error(
				"GA4 client initialized successfully with property ID:",
				this.propertyId,
			);
		} catch (error) {
			console.error("Failed to initialize GA4 client:", error);
			throw error;
		}
	}

	/**
	 * Helper method for running reports
	 * The GA4 API retrieves all data at once, so pagination is implemented on the client side
	 */
	async runReport(config: google.analytics.data.v1beta.IRunReportRequest) {
		try {
			const formattedConfig = {
				...config,
				property: `properties/${this.propertyId}`,
			};

			console.error(
				"Running GA4 report with config:",
				JSON.stringify(formattedConfig, null, 2),
			);

			const [response] = await this.client.runReport(formattedConfig);
			return response;
		} catch (error) {
			console.error("Error running GA4 report:", error);
			throw error;
		}
	}

	/**
	 * Retrieve page view metrics
	 * @param startDate Start date
	 * @param endDate End date
	 * @param dimensions Array of dimensions
	 * @param limit Maximum number of results
	 * @param offset Starting offset
	 * @param filter Conditions to filter the results
	 */
	async getPageViews(
		startDate: string,
		endDate: string,
		dimensions: string[] = ["hostName"],
		limit?: number,
		offset?: number,
		filter?: SimpleFilter,
	) {
		console.error(
			`Getting page views from ${startDate} to ${endDate} with dimensions:`,
			dimensions,
			`(limit: ${limit}, offset: ${offset})`,
		);

		const validDimensions = dimensions.filter(
			(dim) => dim && typeof dim === "string",
		);

		if (validDimensions.length === 0) {
			console.error(
					'No valid dimensions provided, using default "hostName" dimension',
			);
			validDimensions.push("hostName");
		}

		const requestConfig: google.analytics.data.v1beta.IRunReportRequest = {
			dateRanges: [{ startDate, endDate }],
			dimensions: validDimensions.map((dimension) => ({ name: dimension })),
			metrics: [{ name: "screenPageViews" }],
		};

		if (filter) {
			const filterExpression = convertToFilterExpression(filter);
			if (filterExpression) {
				requestConfig.dimensionFilter = filterExpression;
			}
		}

		if (limit && limit > 0) {
			requestConfig.limit = limit;
		}

		return this.runReport(requestConfig);
	}

	/**
	 * Retrieve active user metrics
	 * @param startDate Start date
	 * @param endDate End date
	 * @param limit Maximum number of results
	 * @param offset Starting offset
	 * @param filter Conditions to filter the results
	 */
	async getActiveUsers(
		startDate: string,
		endDate: string,
		limit?: number,
		offset?: number,
		filter?: SimpleFilter,
	) {
		console.error(
			`Getting active users from ${startDate} to ${endDate} (limit: ${limit}, offset: ${offset})`,
		);

		const requestConfig: google.analytics.data.v1beta.IRunReportRequest = {
			dateRanges: [{ startDate, endDate }],
			metrics: [{ name: "activeUsers" }, { name: "newUsers" }],
			dimensions: [{ name: "date" }],
		};

		if (filter) {
			const filterExpression = convertToFilterExpression(filter);
			if (filterExpression) {
				requestConfig.dimensionFilter = filterExpression;
			}
		}

		if (limit && limit > 0) {
			requestConfig.limit = limit;
		}

		return this.runReport(requestConfig);
	}

	/**
	 * Retrieve event metrics
	 * @param startDate Start date
	 * @param endDate End date
	 * @param eventName Event name (optional)
	 * @param limit Maximum number of results
	 * @param offset Starting offset
	 * @param filter Conditions to filter the results
	 */
	async getEvents(
		startDate: string,
		endDate: string,
		eventName?: string,
		limit?: number,
		offset?: number,
		filter?: SimpleFilter,
	) {
		console.error(
			`Getting events from ${startDate} to ${endDate}` +
			`${eventName ? ` for event: ${eventName}` : ""} (limit: ${limit}, offset: ${offset})`,
		);

		const config: google.analytics.data.v1beta.IRunReportRequest = {
			dateRanges: [{ startDate, endDate }],
			dimensions: [{ name: "eventName" }, { name: "date" }],
			metrics: [{ name: "eventCount" }],
		};

		if (eventName) {
			config.dimensionFilter = {
				filter: {
					fieldName: "eventName",
					stringFilter: {
						matchType: "EXACT",
						value: eventName,
					},
				},
			};
		}

		if (filter) {
			const filterExpression = convertToFilterExpression(filter);
			if (filterExpression) {
				if (eventName) {
					config.dimensionFilter = {
						andGroup: {
							expressions: [
								config.dimensionFilter as google.analytics.data.v1beta.IFilterExpression,
								filterExpression,
							],
						},
					};
				} else {
					config.dimensionFilter = filterExpression;
				}
			}
		}

		if (limit && limit > 0) {
			config.limit = limit;
		}

		return this.runReport(config);
	}

	/**
	 * Retrieve user behavior metrics
	 * @param startDate Start date
	 * @param endDate End date
	 * @param limit Maximum number of results
	 * @param offset Starting offset
	 * @param filter Conditions to filter the results
	 */
	async getUserBehavior(
		startDate: string,
		endDate: string,
		limit?: number,
		offset?: number,
		filter?: SimpleFilter,
	) {
		console.error(
			`Getting user behavior from ${startDate} to ${endDate} (limit: ${limit}, offset: ${offset})`,
		);

		const config: google.analytics.data.v1beta.IRunReportRequest = {
			dateRanges: [{ startDate, endDate }],
			metrics: [
				{ name: "averageSessionDuration" },
				{ name: "bounceRate" },
				{ name: "sessionsPerUser" },
			],
			dimensions: [{ name: "date" }],
		};

		if (filter) {
			const filterExpression = convertToFilterExpression(filter);
			if (filterExpression) {
				config.dimensionFilter = filterExpression;
			}
		}

		if (limit && limit > 0) {
			config.limit = limit;
		}

		return this.runReport(config);
	}

	/**
	 * Method to retrieve source media information
	 * @param startDate Start date
	 * @param endDate End date
	 * @param limit Maximum number of results
	 * @param offset Starting offset
	 * @param filter Conditions to filter the results
	 */
	async getSourceMedia(
		startDate: string,
		endDate: string,
		limit?: number,
		offset?: number,
		filter?: SimpleFilter,
	) {
		console.error(
			`Getting source/medium data from ${startDate} to ${endDate} (limit: ${limit}, offset: ${offset})`,
		);

		const config: google.analytics.data.v1beta.IRunReportRequest = {
			dateRanges: [{ startDate, endDate }],
			metrics: [{ name: "sessions" }, { name: "activeUsers" }],
			dimensions: [
				{ name: "sessionSource" },
				{ name: "sessionMedium" },
				{ name: "sessionCampaignName" },
			],
		};

		if (filter) {
			const filterExpression = convertToFilterExpression(filter);
			if (filterExpression) {
				config.dimensionFilter = filterExpression;
			}
		}

		if (limit && limit > 0) {
			config.limit = limit;
		}

		return this.runReport(config);
	}

	/**
	 * Retrieve property information (metadata)
	 */
	async getPropertyMetadata() {
		try {
			const [metadata] = await this.client.getMetadata({
				name: `properties/${this.propertyId}/metadata`,
			});
			return metadata;
		} catch (error) {
			console.error("Error getting GA4 property metadata:", error);
			throw error;
		}
	}
}
