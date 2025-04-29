import type { IMCPResource } from "../types/index.js";
import { handleError } from "../utils/error-handler.js";
import { GA4_METRICS } from "./ga4-metrics.js";

/**
 * GA4 metrics list resource class
 */
export class MetricsResource implements IMCPResource {
	/**
	 * Resource name
	 */
	readonly name = "ga4-metrics";

	/**
	 * Resource URI
	 */
	readonly uri = "ga4://metrics";

	/**
	 * Resource handler
	 */
	async handler(uri: URL) {
		try {
			return {
				contents: [
					{
						uri: uri.href,
						text: GA4_METRICS,
						mimeType: "text/markdown",
					},
				],
			};
		} catch (error) {
			const { message } = handleError(error);
			throw new Error(`Failed to get GA4 metrics: ${message}`);
		}
	}
}
