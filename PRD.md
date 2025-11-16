# Financial Forecasting & Budget Automation Platform

A comprehensive financial analytics platform that transforms CSV financial data into visual insights, forecasts, and AI-powered recommendations for budget optimization.

**Experience Qualities**:
1. **Intelligent** - The platform provides actionable insights through AI-driven analysis that goes beyond simple data visualization
2. **Transparent** - All calculations, forecasts, and recommendations are clearly explained with supporting data and visualizations
3. **Empowering** - Users gain confidence in financial planning through clear trend analysis and accessible predictive modeling

**Complexity Level**: Complex Application (advanced functionality with CSV parsing, statistical forecasting, AI analysis, and multi-chart visualizations)
- This application handles sophisticated data processing, implements forecasting algorithms, integrates AI recommendations, and manages complex state across multiple interactive components while maintaining performance and usability.

## Essential Features

### CSV Upload & Validation
- **Functionality**: Parse and validate CSV files containing financial data (timestamp, revenue, expenses, cash_flow, category)
- **Purpose**: Enable users to import historical financial data for analysis without manual data entry
- **Trigger**: User clicks upload area or drags CSV file into designated zone
- **Progression**: Select file → Validate format → Parse data → Display preview table → Confirm import → Process metrics
- **Success criteria**: Successfully parses valid CSV files, displays clear error messages for invalid formats, and shows data preview before processing

### Financial Metrics Computation
- **Functionality**: Calculate key financial metrics including monthly totals, net profit, burn rate, runway, and growth rates
- **Purpose**: Provide immediate understanding of current financial health and trajectory
- **Trigger**: Automatically computed after successful CSV import
- **Progression**: Parse data → Aggregate by period → Calculate metrics → Display in metric cards → Update charts
- **Success criteria**: Accurate calculations displayed in under 1 second, metrics update reactively when data changes

### Forecasting Engine
- **Functionality**: Predict future revenue, expenses, and cash flow using linear regression and exponential smoothing
- **Purpose**: Help users anticipate future financial states and plan accordingly
- **Trigger**: Automatically runs after metrics computation
- **Progression**: Process historical data → Apply forecasting algorithms → Generate 3-6 month predictions → Overlay on charts → Show confidence intervals
- **Success criteria**: Produces reasonable predictions based on trends, displays forecast accuracy indicators, updates when new data is added

### AI Financial Analysis
- **Functionality**: Generate natural language insights about financial health, trends, anomalies, and optimization recommendations
- **Purpose**: Make complex financial patterns understandable and actionable for non-experts
- **Trigger**: Runs after forecasting completes
- **Progression**: Compile metrics → Structure prompt with data → Call LLM → Parse response → Display formatted report
- **Success criteria**: Generates relevant insights within 5 seconds, identifies actual patterns in the data, provides actionable recommendations

### Interactive Data Visualization
- **Functionality**: Multi-chart dashboard showing revenue, expenses, cash flow trends with forecast overlays
- **Purpose**: Enable visual pattern recognition and trend analysis at a glance
- **Trigger**: Charts render as data becomes available
- **Progression**: Load data → Render historical data → Add forecast overlay → Enable chart interactions → Update tooltips on hover
- **Success criteria**: Charts render smoothly, forecast is visually distinct, tooltips show precise values, responsive to window resize

### Category Analysis
- **Functionality**: Break down financial metrics by operational category
- **Purpose**: Identify which business areas drive revenue or consume resources
- **Trigger**: Computed alongside main metrics
- **Progression**: Group by category → Calculate category totals → Render breakdown chart → Enable filtering
- **Success criteria**: Accurately attributes transactions to categories, displays proportional breakdowns, enables drill-down analysis

## Edge Case Handling

- **Empty CSV**: Display friendly message prompting user to upload valid financial data
- **Malformed CSV**: Show specific validation errors (missing columns, invalid date formats, negative values where unexpected)
- **Insufficient Data**: Require minimum 3 months of data for forecasting; show warning if data is sparse
- **Missing Categories**: Handle null/empty category fields by assigning "Uncategorized" label
- **Future Dates**: Filter out or flag transactions with timestamps in the future
- **Duplicate Entries**: Detect and warn about duplicate timestamps, offer option to aggregate or skip
- **Very Large Files**: Show loading state during parsing, consider file size limits with warnings
- **AI API Failures**: Gracefully degrade to show raw metrics without insights, display retry option
- **Zero Revenue Period**: Handle division by zero in growth rate calculations, show appropriate messaging

## Design Direction

The design should evoke trust, clarity, and sophistication - a professional financial tool that feels modern and intelligent without being overwhelming. It should balance data density with breathing room, using a clean interface that lets the data visualizations be the hero while the AI insights provide narrative context. The aesthetic should feel like a premium fintech product - minimal yet rich with purposeful interactions.

## Color Selection

**Triadic** color scheme using financial trust colors (blue-green) with warm accent for alerts - creating visual distinction between data categories while maintaining professional credibility.

- **Primary Color**: Deep Ocean Blue `oklch(0.45 0.15 240)` - Communicates financial stability, trust, and professionalism; used for primary actions and key metrics
- **Secondary Colors**: 
  - Teal Green `oklch(0.55 0.12 180)` for positive growth indicators and revenue
  - Slate Gray `oklch(0.35 0.02 240)` for neutral UI elements and expenses
- **Accent Color**: Amber Gold `oklch(0.70 0.15 75)` - Highlights important forecasts, warnings, and calls-to-action
- **Foreground/Background Pairings**:
  - Background (White `oklch(0.99 0 0)`): Dark Slate Text `oklch(0.25 0.02 240)` - Ratio 12.5:1 ✓
  - Card (Light Gray `oklch(0.97 0 0)`): Dark Text `oklch(0.25 0.02 240)` - Ratio 11.8:1 ✓
  - Primary (Ocean Blue `oklch(0.45 0.15 240)`): White Text `oklch(0.99 0 0)` - Ratio 7.2:1 ✓
  - Secondary (Teal `oklch(0.55 0.12 180)`): White Text `oklch(0.99 0 0)` - Ratio 4.8:1 ✓
  - Accent (Amber `oklch(0.70 0.15 75)`): Dark Text `oklch(0.25 0.02 240)` - Ratio 8.9:1 ✓
  - Muted (Light Slate `oklch(0.92 0.01 240)`): Medium Text `oklch(0.50 0.02 240)` - Ratio 5.2:1 ✓

## Font Selection

Typography should convey precision and modernity with excellent readability for both dense numerical data and narrative insights - using a geometric sans-serif that balances professionalism with approachability.

- **Typographic Hierarchy**:
  - H1 (Dashboard Title): Inter Bold / 32px / -0.02em letter spacing / 1.2 line height
  - H2 (Section Headers): Inter SemiBold / 24px / -0.01em / 1.3 line height
  - H3 (Metric Labels): Inter Medium / 18px / normal / 1.4 line height
  - Body (Report Text): Inter Regular / 15px / normal / 1.6 line height
  - Data Labels: Inter Medium / 14px / tabular numbers / 1.5 line height
  - Small (Captions): Inter Regular / 13px / normal / 1.5 line height

## Animations

Animations should reinforce the sense of intelligent processing - subtle transitions that guide attention through data flow stages while celebrating successful analyses with purposeful motion that doesn't distract from the information density.

- **Purposeful Meaning**: 
  - Upload area pulses gently on drag-over to confirm drop zone
  - Metric cards count up smoothly when data loads (number animation)
  - Chart lines draw in from left to right suggesting temporal progression
  - Forecast overlay fades in with slight blur-to-focus effect implying prediction emergence
  - AI report panel slides in from right with content fade-in cascade
  - Loading spinners use brand colors with orbital motion suggesting analysis in progress

- **Hierarchy of Movement**:
  1. File upload feedback (immediate, 150ms)
  2. Metric card updates (sequential cascade, 200ms stagger)
  3. Chart rendering (smooth 400ms draw)
  4. Forecast overlay (300ms fade + scale)
  5. AI insights appearance (500ms slide + 200ms content cascade)

## Component Selection

- **Components**:
  - `Card` - Main container for metrics, charts, and AI report sections with subtle shadows
  - `Button` - Primary actions (upload, refresh analysis) with hover lift effect
  - `Table` - Display raw CSV data preview with sortable columns
  - `Tabs` - Switch between different chart views (Revenue, Expenses, Cash Flow, Forecast)
  - `Alert` - Display validation errors and warnings with appropriate severity colors
  - `Badge` - Show category tags and metric change indicators (up/down)
  - `Progress` - Indicate file parsing and AI analysis progress
  - `Separator` - Divide dashboard sections clearly
  - `ScrollArea` - Handle long AI reports and data tables
  - `Collapsible` - Expandable sections for detailed breakdowns and methodology
  - `Tooltip` - Show precise values on chart hover and explain metrics

- **Customizations**:
  - Custom `FileUpload` component with drag-drop, visual feedback, and file validation
  - Custom `MetricCard` component with animated number counting and trend indicators
  - Custom `ForecastChart` component wrapping Recharts with dual-axis capability
  - Custom `AIReportPanel` with structured sections for insights, risks, and recommendations
  - Custom `CategoryBreakdown` component with proportional bars and percentages

- **States**:
  - Buttons: Rest (solid with shadow), Hover (lift + glow), Active (pressed scale), Loading (spinner + disabled opacity), Disabled (muted colors)
  - Upload Area: Empty (dashed border), Drag Over (solid border + background tint), Processing (progress bar), Success (green checkmark), Error (red border + message)
  - Metrics: Loading (skeleton pulse), Animating (count-up), Static, Updated (highlight flash)
  - Charts: Loading (shimmer), Rendering (progressive draw), Interactive (hover highlights), Empty (placeholder message)

- **Icon Selection**:
  - `UploadSimple` - File upload action
  - `TrendUp` / `TrendDown` - Metric change indicators  
  - `ChartLine` - Data visualization section
  - `Lightbulb` - AI insights and recommendations
  - `Warning` - Alerts and anomalies
  - `CalendarBlank` - Date/time references
  - `Money` - Revenue metrics
  - `Receipt` - Expense metrics
  - `ArrowsClockwise` - Refresh/recalculate
  - `Info` - Tooltips and help text

- **Spacing**:
  - Container padding: `p-6` (24px) on desktop, `p-4` (16px) on mobile
  - Card gaps: `gap-4` (16px) for metric cards grid
  - Section spacing: `space-y-6` (24px) between major sections
  - Inline elements: `gap-2` (8px) for buttons and badges
  - Chart margins: `m-4` (16px) internal padding

- **Mobile**:
  - Stack metric cards vertically on screens < 768px
  - Reduce chart height from 400px to 300px on mobile
  - Convert tabs to dropdown select on mobile for chart switching
  - Make AI report panel full-screen modal on mobile instead of sidebar
  - Increase touch targets to minimum 44px for all interactive elements
  - Reduce font sizes by 1-2px on mobile for better density
  - Simplify table to show only key columns on mobile (hide category, show in expandable row)
