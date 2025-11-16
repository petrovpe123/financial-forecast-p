export interface FinancialRecord {
  timestamp: string;
  revenue: number;
  expenses: number;
  cash_flow: number;
  category: string;
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  averageCashFlow: number;
  burnRate: number;
  runway: number;
  revenueGrowth: number;
  expenseGrowth: number;
}

export interface ForecastData {
  timestamp: string;
  revenue: number;
  expenses: number;
  cash_flow: number;
  type: 'historical' | 'forecast';
}

export interface CategoryBreakdown {
  category: string;
  revenue: number;
  expenses: number;
  count: number;
}

export interface AIInsights {
  summary: string;
  trends: string[];
  anomalies: string[];
  recommendations: string[];
  risks: string[];
}
