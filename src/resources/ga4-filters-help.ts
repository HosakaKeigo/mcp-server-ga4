/**
 * How to use GA4 filters
 */
export const GA4_FILTERS_HELP = `# How to Use GA4 Filters

To filter GA4 data in MCP tools, use the \`filter\` parameter. Filters can be specified in the following structure:

## Basic Structure

\`\`\`json
{
  "dimension": [
    {
      "name": "Dimension Name",
      // Filter Type (use one of the following)
      "stringEquals": "Exact Match Value",
      "stringContains": "Contains Value",
      "stringBeginsWith": "Begins With Value",
      "stringEndsWith": "Ends With Value",
      "stringRegex": "Regular Expression",
      "inList": ["Value1", "Value2"],
      "isEmpty": true,
      "caseSensitive": false // Case sensitivity (optional, default is false)
    }
  ],
  "metric": [
    {
      "name": "Metric Name",
      // Filter Type (use one of the following)
      "equals": Number,
      "lessThan": Number,
      "lessThanOrEqual": Number,
      "greaterThan": Number,
      "greaterThanOrEqual": Number,
      "between": { "from": Number, "to": Number },
      "isEmpty": true
    }
  ],
  "operator": "AND" // or "OR" (optional, default is "AND")
}
\`\`\`

## Examples

### Example 1: Retrieve data only for a specific page

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

### Example 2: Filter traffic from a specific source

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

### Example 3: Filter with multiple conditions (AND)

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

### Example 4: Filter with multiple conditions (OR)

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

### Example 5: Filter by metric value

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

### Example 6: Composite filter (combination of dimensions and metrics)

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

### Example 7: Search by prefix (specific prefix of URL path)

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

### Example 8: Filter by regular expression

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
