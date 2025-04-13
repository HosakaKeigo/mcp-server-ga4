import { GA4Client } from '../ga4-client.js';
import { IMCPResource } from '../types/index.js';

/**
 * GA4プロパティ情報リソース定義
 */
export function propertyInfoResource(ga4Client: GA4Client): IMCPResource {
  return {
    name: 'ga4-property',
    uri: 'ga4://property-info',
    handler: async (uri) => {
      try {
        const metadata = await ga4Client.getPropertyMetadata();
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify(metadata, null, 2),
              mimeType: 'application/json',
            },
          ],
        };
      } catch (error: any) {
        throw new Error(`Failed to get GA4 property information: ${error.message}`);
      }
    }
  };
}
