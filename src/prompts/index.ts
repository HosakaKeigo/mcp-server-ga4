import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { analyzeDataPrompt } from './analyze-data.js';
import { createReportPrompt } from './create-report.js';
import { selectDimensionsPrompt } from './select-dimensions.js';

/**
 * プロンプト登録関数
 * すべてのプロンプトをサーバーに登録
 */
export function registerPrompts(server: McpServer) {
  // データ分析プロンプト
  const analyzeData = analyzeDataPrompt();
  server.prompt(
    analyzeData.name,
    analyzeData.schema,
    (args) => analyzeData.handler(args as any)
  );

  // レポート生成プロンプト
  const createReport = createReportPrompt();
  server.prompt(
    createReport.name,
    createReport.schema,
    (args) => createReport.handler(args as any)
  );

  // ディメンション選択プロンプト
  const selectDimensions = selectDimensionsPrompt();
  server.prompt(
    selectDimensions.name,
    selectDimensions.schema,
    (args) => selectDimensions.handler(args as any)
  );

  console.error('GA4 prompts registered');
}
