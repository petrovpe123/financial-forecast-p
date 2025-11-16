import { FinancialRecord, ForecastData } from './types';

interface RegressionResult {
  slope: number;
  intercept: number;
}

function linearRegression(xValues: number[], yValues: number[]): RegressionResult {
  const n = xValues.length;
  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

function exponentialSmoothing(values: number[], alpha: number = 0.3): number[] {
  const smoothed: number[] = [values[0]];
  
  for (let i = 1; i < values.length; i++) {
    smoothed.push(alpha * values[i] + (1 - alpha) * smoothed[i - 1]);
  }
  
  return smoothed;
}

export function generateForecast(records: FinancialRecord[], monthsAhead: number = 6): ForecastData[] {
  const historicalData: ForecastData[] = records.map(record => ({
    ...record,
    type: 'historical' as const,
  }));

  const xValues = records.map((_, index) => index);
  const revenues = records.map(r => r.revenue);
  const expenses = records.map(r => r.expenses);
  const cashFlows = records.map(r => r.cash_flow);

  const smoothedRevenues = exponentialSmoothing(revenues);
  const smoothedExpenses = exponentialSmoothing(expenses);
  const smoothedCashFlows = exponentialSmoothing(cashFlows);

  const revenueRegression = linearRegression(xValues, smoothedRevenues);
  const expenseRegression = linearRegression(xValues, smoothedExpenses);
  const cashFlowRegression = linearRegression(xValues, smoothedCashFlows);

  const lastDate = new Date(records[records.length - 1].timestamp);
  const forecastData: ForecastData[] = [];

  for (let i = 1; i <= monthsAhead; i++) {
    const futureIndex = records.length + i - 1;
    const forecastDate = new Date(lastDate);
    forecastDate.setMonth(lastDate.getMonth() + i);

    const predictedRevenue = Math.max(0, revenueRegression.slope * futureIndex + revenueRegression.intercept);
    const predictedExpenses = Math.max(0, expenseRegression.slope * futureIndex + expenseRegression.intercept);
    const predictedCashFlow = cashFlowRegression.slope * futureIndex + cashFlowRegression.intercept;

    forecastData.push({
      timestamp: forecastDate.toISOString().split('T')[0],
      revenue: Math.round(predictedRevenue),
      expenses: Math.round(predictedExpenses),
      cash_flow: Math.round(predictedCashFlow),
      type: 'forecast',
    });
  }

  return [...historicalData, ...forecastData];
}

export function calculateForecastAccuracy(records: FinancialRecord[]): number {
  if (records.length < 4) return 0;

  const testSize = Math.min(3, Math.floor(records.length * 0.3));
  const trainData = records.slice(0, records.length - testSize);
  const testData = records.slice(records.length - testSize);

  const forecast = generateForecast(trainData, testSize);
  const forecastValues = forecast.filter(f => f.type === 'forecast');

  let totalError = 0;
  for (let i = 0; i < testSize; i++) {
    const actual = testData[i].revenue;
    const predicted = forecastValues[i].revenue;
    const percentError = Math.abs((actual - predicted) / actual);
    totalError += percentError;
  }

  const averageError = totalError / testSize;
  const accuracy = Math.max(0, (1 - averageError) * 100);

  return Math.round(accuracy);
}
