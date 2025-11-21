import { describe, it, expect } from 'vitest';
import { generateForecast, calculateForecastAccuracy } from '../lib/forecasting';
import { FinancialRecord } from '../lib/types';

describe('Forecasting', () => {
  const sampleRecords: FinancialRecord[] = [
    { timestamp: '2024-01-01', revenue: 10000, expenses: 5000, cash_flow: 5000, category: 'Sales' },
    { timestamp: '2024-02-01', revenue: 12000, expenses: 6000, cash_flow: 6000, category: 'Sales' },
    { timestamp: '2024-03-01', revenue: 15000, expenses: 7000, cash_flow: 8000, category: 'Marketing' },
    { timestamp: '2024-04-01', revenue: 18000, expenses: 8000, cash_flow: 10000, category: 'Sales' },
    { timestamp: '2024-05-01', revenue: 20000, expenses: 9000, cash_flow: 11000, category: 'Sales' },
  ];

  it('should generate forecast with correct number of periods', () => {
    const forecast = generateForecast(sampleRecords, 3);

    // Should have historical data + forecast data
    expect(forecast.length).toBe(8); // 5 historical + 3 forecast

    const historicalData = forecast.filter(f => f.type === 'historical');
    const forecastData = forecast.filter(f => f.type === 'forecast');

    expect(historicalData.length).toBe(5);
    expect(forecastData.length).toBe(3);
  });

  it('should calculate forecast accuracy for sufficient data', () => {
    const accuracy = calculateForecastAccuracy(sampleRecords);

    expect(accuracy).toBeGreaterThanOrEqual(0);
    expect(accuracy).toBeLessThanOrEqual(100);
    expect(typeof accuracy).toBe('number');
  });
});
