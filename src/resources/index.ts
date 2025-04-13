import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GA4Client } from '../ga4-client.js';
import { propertyInfoResource } from './property-info.js';
import { dimensionsResource } from './dimensions.js';
import { filtersHelpResource } from './filters-help.js';

/**
 * リソース登録関数
 * すべてのリソースをサーバーに登録
 */
export function registerResources(server: McpServer, ga4Client: GA4Client) {
  // GA4プロパティ情報リソース
  const propertyInfo = propertyInfoResource(ga4Client);
  server.resource(
    propertyInfo.name,
    propertyInfo.uri,
    propertyInfo.handler
  );

  // GA4ディメンション一覧リソース
  const dimensions = dimensionsResource();
  server.resource(
    dimensions.name,
    dimensions.uri,
    dimensions.handler
  );

  // GA4フィルターヘルプリソース
  const filtersHelp = filtersHelpResource();
  server.resource(
    filtersHelp.name,
    filtersHelp.uri,
    filtersHelp.handler
  );

  console.error('GA4 resources registered');
}
