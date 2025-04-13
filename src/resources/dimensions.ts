import { GA4_DIMENSIONS } from './ga4-dimensions.js';

/**
 * GA4ディメンション一覧リソース定義
 */
export function dimensionsResource() {
  return {
    name: 'ga4-dimensions',
    uri: 'ga4://dimensions',
    handler: async (uri: URL) => {
      try {
        return {
          contents: [
            {
              uri: uri.href,
              text: GA4_DIMENSIONS,
              mimeType: 'text/markdown',
            },
          ],
        };
      } catch (error: any) {
        throw new Error(`Failed to get GA4 dimensions: ${error.message}`);
      }
    }
  };
}
