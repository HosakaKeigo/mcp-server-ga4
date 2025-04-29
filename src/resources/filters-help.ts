import type { IMCPResource } from "../types/index.js";
import { handleError } from "../utils/error-handler.js";
import { GA4_FILTERS_HELP } from "./ga4-filters-help.js";

/**
 * GA4 Filter Help Resource Class
 */
export class FiltersHelpResource implements IMCPResource {
	/**
	 * Resource Name
	 */
	readonly name = "ga4-filters-help";

	/**
	 * Resource URI
	 */
	readonly uri = "ga4://filters-help";

	/**
	 * Resource Handler
	 */
	async handler(uri: URL) {
		try {
			return {
				contents: [
					{
						uri: uri.href,
						text: GA4_FILTERS_HELP,
						mimeType: "text/markdown",
					},
				],
			};
		} catch (error) {
			const { message } = handleError(error);
			throw new Error(`Failed to process filters help: ${message}`);
		}
	}
}
