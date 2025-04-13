import type { GA4Client } from "../ga4-client.js";
import type { IMCPResource } from "../types/index.js";

/**
 * GA4プロパティ情報リソースクラス
 */
export class PropertyInfoResource implements IMCPResource {
	/**
	 * GA4クライアントインスタンス
	 */
	private ga4Client: GA4Client;

	/**
	 * コンストラクタ
	 * @param ga4Client GA4クライアントインスタンス
	 */
	constructor(ga4Client: GA4Client) {
		this.ga4Client = ga4Client;
	}

	/**
	 * リソース名
	 */
	readonly name = "ga4-property";

	/**
	 * リソースURI
	 */
	readonly uri = "ga4://property-info";

	/**
	 * リソースハンドラー
	 */
	async handler(uri: URL) {
		try {
			const metadata = await this.ga4Client.getPropertyMetadata();
			return {
				contents: [
					{
						uri: uri.href,
						text: JSON.stringify(metadata, null, 2),
						mimeType: "application/json",
					},
				],
			};
		} catch (error: any) {
			throw new Error(
				`Failed to get GA4 property information: ${error.message}`,
			);
		}
	}
}
