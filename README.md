# 💰 Financial Forecasting & Budget Automation Platform

A comprehensive financial analytics platform that transforms CSV financial data into visual insights, forecasts, and AI-powered recommendations for budget optimization. This intelligent tool helps businesses and individuals understand their financial health, predict future trends, and make data-driven decisions.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

### 📊 **CSV Upload & Validation**
- Drag-and-drop CSV file upload with comprehensive validation
- Automatic format checking and error detection
- Preview data before processing with detailed error messages
- Support for financial data with timestamps, revenue, expenses, cash flow, and categories

### 📈 **Financial Metrics Computation**
- Real-time calculation of key financial metrics
- Monthly totals, net profit, and burn rate analysis
- Runway calculations and growth rate tracking
- Instant metric updates when data changes

### 🔮 **Advanced Forecasting Engine**
- Predict future revenue, expenses, and cash flow using statistical models
- Linear regression and exponential smoothing algorithms
- 3-6 month forecast projections with confidence intervals
- Accuracy indicators for forecast reliability

### 🤖 **AI-Powered Financial Analysis**
- Natural language insights about financial health and trends
- Anomaly detection and pattern recognition
- Actionable optimization recommendations
- Easy-to-understand reports for non-experts

### 📉 **Interactive Data Visualization**
- Multi-chart dashboard with responsive design
- Revenue, expenses, and cash flow trend visualizations
- Forecast overlays with historical data comparison
- Interactive tooltips and chart controls
- Category breakdown charts for detailed analysis

### 🏷️ **Category Analysis**
- Break down financial metrics by operational category
- Identify revenue drivers and resource consumption patterns
- Proportional breakdown visualizations
- Drill-down analysis capabilities

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **UI Components**: Radix UI with Tailwind CSS 4
- **Charts**: Recharts for data visualization
- **AI Integration**: GitHub Spark AI for insights
- **Data Processing**: D3.js for advanced data manipulation
- **Animations**: Framer Motion for smooth transitions
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React hooks with TanStack Query

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/petrovpe123/financial-forecast-p.git
   cd financial-forecast-p
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage

1. **Upload Your Data**
   - Prepare a CSV file with columns: `timestamp`, `revenue`, `expenses`, `cash_flow`, `category`
   - Drag and drop the file into the upload area or click to browse
   - Review the data preview and confirm import

2. **Analyze Metrics**
   - View automatically calculated financial metrics in the dashboard
   - Explore monthly totals, net profit, burn rate, and runway
   - Track growth rates and trends

3. **Review Forecasts**
   - Switch to forecast tabs to see future projections
   - Examine confidence intervals and accuracy indicators
   - Compare historical data with predictions

4. **Get AI Insights**
   - Read the AI-generated financial analysis report
   - Review identified trends and anomalies
   - Act on optimization recommendations

5. **Explore Categories**
   - Use category breakdown charts to understand spending patterns
   - Filter and drill down into specific business areas
   - Identify optimization opportunities

## 📁 Project Structure

```
financial-forecast-p/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── FileUpload.tsx  # CSV upload component
│   │   ├── MetricCard.tsx  # Financial metrics display
│   │   ├── FinancialChart.tsx  # Chart visualizations
│   │   ├── CategoryChart.tsx   # Category analysis
│   │   ├── AIReportPanel.tsx   # AI insights panel
│   │   └── DataTable.tsx   # Data table component
│   ├── lib/                # Utility libraries
│   │   ├── csvParser.ts    # CSV parsing logic
│   │   ├── metrics.ts      # Financial calculations
│   │   ├── forecasting.ts  # Forecasting algorithms
│   │   ├── aiInsights.ts   # AI integration
│   │   └── types.ts        # TypeScript definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── PRD.md                  # Product requirements document
├── SECURITY.md             # Security policy
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run optimize` - Optimize Vite dependencies

### Code Quality

This project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Tailwind CSS** for styling with design tokens
- **Component-based architecture** for maintainability

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more information on how to get involved.

## 🔒 Security

Security is important to us. If you discover any security vulnerabilities, please see our [Security Policy](SECURITY.md) for reporting procedures.

## 📋 Requirements

For detailed product requirements, features, and design specifications, please refer to [PRD.md](PRD.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

## 🌟 Acknowledgments

- Built with [GitHub Spark](https://githubnext.com/projects/github-spark)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)

---

**Experience Qualities**: Intelligent • Transparent • Empowering
