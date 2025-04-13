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
    analyzeData.handler
  );

  // レポート生成プロンプト
  const createReport = createReportPrompt();
  server.prompt(
    createReport.name,
    createReport.schema,
    createReport.handler
  );

  // ディメンション選択プロンプト
  const selectDimensions = selectDimensionsPrompt();
  server.prompt(
    selectDimensions.name,
    selectDimensions.schema,
    selectDimensions.handler
  );

  console.error('GA4 prompts registered');
}