import type { IMCPResource } from "../types/index.js";
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
		} catch (error: any) {
			throw new Error(`Failed to get GA4 filters help: ${error.message}`);
		}
	}
}
