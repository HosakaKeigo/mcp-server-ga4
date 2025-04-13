# Google Analytics 4用MCPサーバー

>[!NOTE]
>このプロジェクトは開発中です。サーバーはまだ完全にテストされていません。自己責任でご使用ください。

## 主な機能

このサーバーは以下のMCP機能を提供します：

### ツール

*   `get-page-views`: 指定した日付範囲のページビュー指標を取得します。
*   `get-active-users`: 指定した日付範囲のアクティブユーザー指標を取得します。
*   `get-events`: 指定した日付範囲のイベント指標を取得します。
*   `get-user-behavior`: セッション時間やバウンス率などのユーザー行動指標を取得します。

### リソース

*   `ga4://property-info`: GA4プロパティのメタデータ。
*   `ga4://dimensions`: 利用可能なGA4ディメンションのリスト。
*   `ga4://filters-help`: GA4フィルターの使用に関するヘルプドキュメント。

### プロンプト

*   `analyze-data`: データ分析アシスタント。
*   `create-report`: レポート生成テンプレート。
*   `select-dimensions`: 分析目標に適したディメンションの選択をサポート。

## セットアップ

### 前提条件

*   Google Analytics 4プロパティ。
*   GA4 APIにアクセスできるGoogle Cloudサービスアカウント。
*   Node.js 20以上。
*   pnpmパッケージマネージャー。

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/mcp-server-ga4.git
cd mcp-server-ga4

# pnpmで依存関係をインストール
pnpm install

# .envファイルを作成
cp .env.example .env

# .envファイルを編集して認証情報を設定
# GOOGLE_CLIENT_EMAIL=your-service-account-email@example.iam.gserviceaccount.com
# GOOGLE_PRIVATE_KEY=your-private-key
# GA_PROPERTY_ID=your-ga4-property-id
```

### ビルドと実行

```bash
# サーバーをビルド
pnpm run build

# サーバーを実行
pnpm start
```

## 使用方法

### Claude for Desktopとの統合

`claude_desktop_config.json`ファイルに以下を追加してください：

```json
{
  "mcpServers": {
    "ga4": {
      "command": "node",
      "args": ["/path/to/mcp-server-ga4/dist/index.js"],
      "env": {
        "GOOGLE_CLIENT_EMAIL": "your-service-account-email@example.iam.gserviceaccount.com",
        "GOOGLE_PRIVATE_KEY": "your-private-key",
        "GA_PROPERTY_ID": "your-ga4-property-id"
      }
    }
  }
}
```

### フィルタリング

すべてのツールで`filter`パラメータを使用して結果を絞り込むことができます：

```json
{
  "dimension": [
    {
      "name": "pagePath",
      "stringEquals": "/blog/article-1"
    }
  ],
  "metric": [
    {
      "name": "screenPageViews",
      "greaterThan": 100
    }
  ],
  "operator": "AND"
}
```

### ページネーション

大量のデータを扱う場合は、`limit`と`offset`パラメータを使用してください：

```
// 最初のページ（1-50項目）
get-page-views with limit=50, offset=0

// 2ページ目（51-100項目）
get-page-views with limit=50, offset=50
```

## トラブルシューティング

*   **認証エラー**: サービスアカウントキーと権限を確認してください。
*   **データが表示されない**: 日付範囲とプロパティIDが正しいことを確認してください。
*   **接続エラー**: ネットワーク設定とファイアウォールを確認してください。

## テスト

MCP Inspectorを使用してテストします：

```bash
pnpm dlx @modelcontextprotocol/inspector node /path/to/mcp-server-ga4/dist/index.js
```
*（注：`pnpm dlx`はパッケージを実行するための`npx`と同等です）*

## ライセンス

MIT

## 謝辞
- https://github.com/lapras-inc/lapras-mcp-server/tree/main
  - MCPの実装のクラスベース構造を参考にしました。
- https://github.com/ruchernchong/mcp-server-google-analytics
  - Google Analytics APIの基本的な実装に依存しています。