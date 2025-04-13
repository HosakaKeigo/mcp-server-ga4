import type { IMCPResource } from "../types/index.js";
import { handleError } from "../utils/error-handler.js";
import { GA4_DIMENSIONS } from "./ga4-dimensions.js";

/**
 * GA4ディメンション一覧リソースクラス
 */
export class DimensionsResource implements IMCPResource {
	/**
	 * リソース名
	 */
	readonly name = "ga4-dimensions";

	/**
	 * リソースURI
	 */
	readonly uri = "ga4://dimensions";

	/**
	 * リソースハンドラー
	 */
	async handler(uri: URL) {
		try {
			return {
				contents: [
					{
						uri: uri.href,
						text: GA4_DIMENSIONS,
						mimeType: "text/markdown",
					},
				],
			};
		} catch (error) {
			const { message } = handleError(error);
			throw new Error(`Failed to get GA4 dimensions: ${message}`);
		}
	}
}
