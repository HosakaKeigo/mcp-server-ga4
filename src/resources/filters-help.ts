import type { IMCPResource } from "../types/index.js";
import { handleError } from "../utils/error-handler.js";
import { GA4_FILTERS_HELP } from "./ga4-filters-help.js";

/**
 * GA4フィルターヘルプリソースクラス
 */
export class FiltersHelpResource implements IMCPResource {
	/**
	 * リソース名
	 */
	readonly name = "ga4-filters-help";

	/**
	 * リソースURI
	 */
	readonly uri = "ga4://filters-help";

	/**
	 * リソースハンドラー
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
