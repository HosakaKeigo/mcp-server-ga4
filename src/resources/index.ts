import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GA4Client } from '../ga4-client.js';
import { PropertyInfoResource } from './property-info.js';
import { DimensionsResource } from './dimensions.js';
import { FiltersHelpResource } from './filters-help.js';

/**
 * リソース登録関数
 * すべてのリソースをサーバーに登録
 */
export function registerResources(server: McpServer, ga4Client: GA4Client) {
  const ALL_RESOURCES = [
    new PropertyInfoResource(ga4Client),
    new DimensionsResource(),
    new FiltersHelpResource()
  ]

  for (const resource of ALL_RESOURCES) {
    server.resource(resource.name, resource.uri, resource.handler.bind(resource));
  }
}
