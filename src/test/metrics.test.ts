import { describe, it, expect } from 'vitest';
import { calculateMetrics, calculateCategoryBreakdown } from '../lib/metrics';
import { FinancialRecord } from '../lib/types';

describe('Metrics Calculation', () => {
  const sampleRecords: FinancialRecord[] = [
    { timestamp: '2024-01-01', revenue: 10000, expenses: 5000, cash_flow: 5000, category: 'Sales' },
    { timestamp: '2024-02-01', revenue: 12000, expenses: 6000, cash_flow: 6000, category: 'Sales' },
    { timestamp: '2024-03-01', revenue: 15000, expenses: 7000, cash_flow: 8000, category: 'Marketing' },
    { timestamp: '2024-04-01', revenue: 18000, expenses: 8000, cash_flow: 10000, category: 'Sales' },
  ];

  it('should calculate total revenue and expenses correctly', () => {
    const metrics = calculateMetrics(sampleRecords);

    expect(metrics.totalRevenue).toBe(55000);
    expect(metrics.totalExpenses).toBe(26000);
  });

  it('should calculate net profit and average cash flow correctly', () => {
    const metrics = calculateMetrics(sampleRecords);

    expect(metrics.netProfit).toBe(29000);
    expect(metrics.averageCashFlow).toBe(7250);
  });

  it('should calculate growth rates correctly', () => {
    const metrics = calculateMetrics(sampleRecords);

    // First half: 10000, 12000 (avg: 11000)
    // Second half: 15000, 18000 (avg: 16500)
    // Growth: ((16500 - 11000) / 11000) * 100 = 50%
    expect(metrics.revenueGrowth).toBeCloseTo(50, 0);

    // First half expenses: 5000, 6000 (avg: 5500)
    // Second half expenses: 7000, 8000 (avg: 7500)
    // Growth: ((7500 - 5500) / 5500) * 100 ≈ 36.36%
    expect(metrics.expenseGrowth).toBeCloseTo(36.36, 1);
  });

  it('should calculate category breakdown correctly', () => {
    const categories = calculateCategoryBreakdown(sampleRecords);

    expect(categories.length).toBe(2);
    
    const salesCategory = categories.find(c => c.category === 'Sales');
    expect(salesCategory).toBeDefined();
    expect(salesCategory?.revenue).toBe(40000);
    expect(salesCategory?.expenses).toBe(19000);
    expect(salesCategory?.count).toBe(3);

    const marketingCategory = categories.find(c => c.category === 'Marketing');
    expect(marketingCategory).toBeDefined();
    expect(marketingCategory?.revenue).toBe(15000);
    expect(marketingCategory?.expenses).toBe(7000);
    expect(marketingCategory?.count).toBe(1);
  });
});
