# 💰 Financial Forecasting & Budget Automation Platform

A comprehensive financial analytics platform that transforms CSV financial data into visual insights, forecasts, and AI-powered recommendations for budget optimization.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6.3-646cff.svg)

## ✨ Overview

This platform provides **intelligent**, **transparent**, and **empowering** financial analysis tools that help users understand their financial health, predict future trends, and make data-driven budget decisions. Built with modern web technologies and powered by AI, it transforms complex financial data into actionable insights.

### Experience Qualities

- **🧠 Intelligent** - AI-driven analysis provides actionable insights beyond simple data visualization
- **🔍 Transparent** - All calculations, forecasts, and recommendations are clearly explained with supporting data
- **💪 Empowering** - Users gain confidence in financial planning through clear trend analysis and accessible predictive modeling

## 🚀 Features

### 📊 CSV Upload & Validation
- Parse and validate CSV files containing financial data (timestamp, revenue, expenses, cash_flow, category)
- Drag-and-drop interface with real-time validation
- Data preview before processing
- Clear error messages for invalid formats

### 📈 Financial Metrics Computation
- Automatic calculation of key financial metrics:
  - Monthly totals and averages
  - Net profit and margins
  - Burn rate and runway
  - Growth rates and trends
- Real-time metric updates as data changes
- Category-based analysis and breakdowns

### 🔮 Forecasting Engine
- Predict future revenue, expenses, and cash flow
- Uses linear regression and exponential smoothing algorithms
- Generate 3-6 month predictions with confidence intervals
- Visual forecast overlays on interactive charts

### 🤖 AI Financial Analysis
- Natural language insights about financial health
- Trend and anomaly detection
- Budget optimization recommendations
- Actionable advice for non-financial experts

### 📉 Interactive Data Visualization
- Multi-chart dashboard with:
  - Revenue trends
  - Expense tracking
  - Cash flow analysis
  - Forecast overlays
- Responsive charts with hover tooltips
- Category breakdowns and drill-down analysis

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.0 with TypeScript
- **Build Tool**: Vite 6.3
- **UI Components**: Radix UI with custom components
- **Styling**: Tailwind CSS 4.1 with custom design system
- **Data Visualization**: Recharts with D3.js
- **State Management**: TanStack Query
- **Animation**: Framer Motion
- **AI Integration**: GitHub Spark AI

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/petrovpe123/financial-forecast-p.git
   cd financial-forecast-p
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Getting Started

1. **Upload Your Financial Data**
   - Prepare a CSV file with columns: `timestamp`, `revenue`, `expenses`, `cash_flow`, `category`
   - Drag and drop the file into the upload area or click to browse
   - Review the data preview and confirm the import

2. **View Financial Metrics**
   - Automatically calculated metrics appear in dashboard cards
   - Review key indicators like burn rate, runway, and growth rates
   - Explore category-based breakdowns

3. **Analyze Forecasts**
   - View 3-6 month predictions overlaid on historical data
   - Check confidence intervals to understand prediction reliability
   - Use forecast data for budget planning

4. **Review AI Insights**
   - Read natural language analysis of your financial health
   - Review identified trends and anomalies
   - Consider AI-generated recommendations for optimization

### CSV Format

Your CSV file should follow this format:

```csv
timestamp,revenue,expenses,cash_flow,category
2024-01-01,50000,30000,20000,Operations
2024-02-01,55000,32000,23000,Operations
2024-03-01,60000,35000,25000,Marketing
```

**Required columns**:
- `timestamp` - Date in ISO format (YYYY-MM-DD)
- `revenue` - Revenue amount (numeric)
- `expenses` - Expense amount (numeric)
- `cash_flow` - Cash flow amount (numeric)
- `category` - Business category (string)

## 🏗️ Project Structure

```
financial-forecast-p/
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── PRD.md              # Product Requirements Document
├── README.md           # This file
├── SECURITY.md         # Security policy
└── package.json        # Dependencies and scripts
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run optimize` - Optimize dependencies

### Design System

The platform uses a professional financial design system with:
- **Primary Color**: Deep Ocean Blue - trust and stability
- **Secondary Colors**: Teal Green (positive indicators), Slate Gray (neutral elements)
- **Accent Color**: Amber Gold - highlights and warnings
- **Typography**: Inter font family for clarity and precision
- **Animations**: Purposeful transitions that guide attention

See [PRD.md](PRD.md) for detailed design specifications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security

Security is a top priority. If you discover a security vulnerability, please review our [Security Policy](SECURITY.md) for reporting guidelines.

**Do not report security vulnerabilities through public GitHub issues.**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright GitHub, Inc.

## 🙏 Acknowledgments

- Built with [GitHub Spark](https://githubnext.com/projects/github-spark)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For questions and support, please open an issue in the GitHub repository.

---

**Note**: This platform requires at least 3 months of historical financial data for accurate forecasting. Ensure your CSV data is clean and properly formatted for best results.
