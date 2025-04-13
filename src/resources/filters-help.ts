import { IMCPResource } from '../types/index.js';
import { GA4_FILTERS_HELP } from './ga4-filters-help.js';

/**
 * GA4フィルターヘルプリソース定義
 */
export function filtersHelpResource(): IMCPResource {
  return {
    name: 'ga4-filters-help',
    uri: 'ga4://filters-help',
    handler: async (uri) => {
      try {
        return {
          contents: [
            {
              uri: uri.href,
              text: GA4_FILTERS_HELP,
              mimeType: 'text/markdown',
            },
          ],
        };
      } catch (error: any) {
        throw new Error(`Failed to get GA4 filters help: ${error.message}`);
      }
    }
  };
}
