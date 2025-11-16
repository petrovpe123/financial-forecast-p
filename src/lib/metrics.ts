import { FinancialRecord, FinancialMetrics, CategoryBreakdown } from './types';

export function calculateMetrics(records: FinancialRecord[]): FinancialMetrics {
  const totalRevenue = records.reduce((sum, r) => sum + r.revenue, 0);
  const totalExpenses = records.reduce((sum, r) => sum + r.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const averageCashFlow = records.reduce((sum, r) => sum + r.cash_flow, 0) / records.length;

  const recentMonths = records.slice(-3);
  const averageMonthlyExpenses = recentMonths.reduce((sum, r) => sum + r.expenses, 0) / recentMonths.length;
  
  const burnRate = averageMonthlyExpenses;
  const runway = averageCashFlow > 0 ? (totalRevenue / burnRate) : 0;

  const firstHalf = records.slice(0, Math.floor(records.length / 2));
  const secondHalf = records.slice(Math.floor(records.length / 2));

  const firstHalfRevenue = firstHalf.reduce((sum, r) => sum + r.revenue, 0) / firstHalf.length;
  const secondHalfRevenue = secondHalf.reduce((sum, r) => sum + r.revenue, 0) / secondHalf.length;
  const revenueGrowth = firstHalfRevenue > 0 
    ? ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100 
    : 0;

  const firstHalfExpenses = firstHalf.reduce((sum, r) => sum + r.expenses, 0) / firstHalf.length;
  const secondHalfExpenses = secondHalf.reduce((sum, r) => sum + r.expenses, 0) / secondHalf.length;
  const expenseGrowth = firstHalfExpenses > 0 
    ? ((secondHalfExpenses - firstHalfExpenses) / firstHalfExpenses) * 100 
    : 0;

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    averageCashFlow,
    burnRate,
    runway,
    revenueGrowth,
    expenseGrowth,
  };
}

export function calculateCategoryBreakdown(records: FinancialRecord[]): CategoryBreakdown[] {
  const categoryMap = new Map<string, CategoryBreakdown>();

  records.forEach(record => {
    const category = record.category || 'Uncategorized';
    const existing = categoryMap.get(category);

    if (existing) {
      existing.revenue += record.revenue;
      existing.expenses += record.expenses;
      existing.count += 1;
    } else {
      categoryMap.set(category, {
        category,
        revenue: record.revenue,
        expenses: record.expenses,
        count: 1,
      });
    }
  });

  return Array.from(categoryMap.values()).sort((a, b) => b.revenue - a.revenue);
}
