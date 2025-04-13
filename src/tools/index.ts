import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GA4Client } from '../ga4-client.js';
import { pageViewsTool } from './page-views.js';
import { activeUsersTool } from './active-users.js';
import { eventsTool } from './events.js';
import { userBehaviorTool } from './user-behavior.js';

/**
 * ツール登録関数
 * すべてのツールをサーバーに登録
 */
export function registerTools(server: McpServer, ga4Client: GA4Client) {
  // ページビュー取得ツール
  const pageViews = pageViewsTool(ga4Client);
  server.tool(
    pageViews.name,
    pageViews.description,
    pageViews.schema,
    pageViews.handler
  );

  // アクティブユーザー取得ツール
  const activeUsers = activeUsersTool(ga4Client);
  server.tool(
    activeUsers.name,
    activeUsers.description,
    activeUsers.schema,
    activeUsers.handler
  );

  // イベント取得ツール
  const events = eventsTool(ga4Client);
  server.tool(
    events.name,
    events.description,
    events.schema,
    events.handler
  );

  // ユーザー行動分析ツール
  const userBehavior = userBehaviorTool(ga4Client);
  server.tool(
    userBehavior.name,
    userBehavior.description,
    userBehavior.schema,
    userBehavior.handler
  );

  console.error('GA4 tools registered');
}
