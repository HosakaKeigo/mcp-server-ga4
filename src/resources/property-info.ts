import type { GA4Client } from "../ga4-client.js";
import type { IMCPResource } from "../types/index.js";
import { handleError } from "../utils/error-handler.js";

/**
 * GA4 property information resource class
 */
export class PropertyInfoResource implements IMCPResource {
	/**
	 * GA4 client instance
	 */
	private ga4Client: GA4Client;

	/**
	 * Constructor
	 * @param ga4Client GA4 client instance
	 */
	constructor(ga4Client: GA4Client) {
		this.ga4Client = ga4Client;
	}

	/**
	 * Resource name
	 */
	readonly name = "ga4-property";

	/**
	 * Resource URI
	 */
	readonly uri = "ga4://property-info";

	/**
	 * Resource handler
	 */
	async handler(uri: URL) {
		try {
			const metadata = await this.ga4Client.getPropertyMetadata();

			// Extract only the essential information
			const dimensions = metadata.dimensions?.map((dimension) => ({
				name: dimension.apiName,
				description: dimension.description,
				type: dimension.category,
			}));
			const metrics = metadata.metrics?.map((metric) => ({
				name: metric.apiName,
				description: metric.description,
				type: metric.category,
			}));
			const comparisons = metadata.comparisons?.map((comparison) => ({
				name: comparison.apiName,
				description: comparison.description,
			}));

			const propertyInfo = {
				dimensions,
				metrics,
				comparisons,
			};

			return {
				contents: [
					{
						uri: uri.href,
						text: JSON.stringify(propertyInfo, null, 2),
						mimeType: "application/json",
					},
				],
			};
		} catch (error) {
			const { message } = handleError(error);
			throw new Error(`Failed to get property info: ${message}`);
		}
	}
}
