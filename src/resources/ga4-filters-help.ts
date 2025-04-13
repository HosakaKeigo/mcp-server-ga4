/**
 * GA4フィルター使用方法
 */
export const GA4_FILTERS_HELP = `# GA4 フィルター使用法

MCPツールでGA4データをフィルタリングするには、\`filter\`パラメータを使用します。フィルターは以下の構造で指定できます：

## 基本構造

\`\`\`json
{
  "dimension": [
    {
      "name": "ディメンション名",
      // フィルタータイプ（以下のいずれか1つを使用）
      "stringEquals": "完全一致する値",
      "stringContains": "含む値",
      "stringBeginsWith": "始まる値",
      "stringEndsWith": "終わる値",
      "stringRegex": "正規表現",
      "inList": ["値1", "値2"],
      "isEmpty": true,
      "caseSensitive": false // 大文字小文字を区別するか（オプション、デフォルトはfalse）
    }
  ],
  "metric": [
    {
      "name": "メトリック名",
      // フィルタータイプ（以下のいずれか1つを使用）
      "equals": 数値,
      "lessThan": 数値,
      "lessThanOrEqual": 数値,
      "greaterThan": 数値,
      "greaterThanOrEqual": 数値,
      "between": { "from": 数値, "to": 数値 },
      "isEmpty": true
    }
  ],
  "operator": "AND" // または "OR"（オプション、デフォルトは "AND"）
}
\`\`\`

## 使用例

### 例1: 特定のページに関するデータのみを取得

\`\`\`json
{
  "dimension": [
    {
      "name": "pagePath",
      "stringEquals": "/blog/article-1"
    }
  ]
}
\`\`\`

### 例2: 特定のソースからのトラフィックでフィルタリング

\`\`\`json
{
  "dimension": [
    {
      "name": "source",
      "stringEquals": "google"
    }
  ]
}
\`\`\`

### 例3: 複数条件での絞り込み（AND条件）

\`\`\`json
{
  "dimension": [
    {
      "name": "deviceCategory",
      "stringEquals": "mobile"
    },
    {
      "name": "country",
      "stringEquals": "Japan"
    }
  ],
  "operator": "AND"
}
\`\`\`

### 例4: 複数条件での絞り込み（OR条件）

\`\`\`json
{
  "dimension": [
    {
      "name": "browser",
      "stringEquals": "Chrome"
    },
    {
      "name": "browser",
      "stringEquals": "Safari"
    }
  ],
  "operator": "OR"
}
\`\`\`

### 例5: 指標値でのフィルタリング

\`\`\`json
{
  "metric": [
    {
      "name": "screenPageViews",
      "greaterThan": 100
    }
  ]
}
\`\`\`

### 例6: 複合フィルター（ディメンションと指標の組み合わせ）

\`\`\`json
{
  "dimension": [
    {
      "name": "deviceCategory",
      "stringEquals": "desktop"
    }
  ],
  "metric": [
    {
      "name": "screenPageViews",
      "greaterThan": 10
    }
  ],
  "operator": "AND"
}
\`\`\`

### 例7: 前方一致で検索（URLパスの特定のプレフィックス）

\`\`\`json
{
  "dimension": [
    {
      "name": "pagePath",
      "stringBeginsWith": "/products/"
    }
  ]
}
\`\`\`

### 例8: 正規表現でフィルタリング

\`\`\`json
{
  "dimension": [
    {
      "name": "pagePath",
      "stringRegex": "^/blog/[0-9]{4}/"
    }
  ]
}
\`\`\``;
