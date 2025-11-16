import { FinancialRecord, FinancialMetrics, ForecastData, AIInsights, CategoryBreakdown } from './types';

export async function generateAIInsights(
  records: FinancialRecord[],
  metrics: FinancialMetrics,
  forecast: ForecastData[],
  categories: CategoryBreakdown[]
): Promise<AIInsights> {
  const historicalData = forecast.filter(f => f.type === 'historical');
  const forecastData = forecast.filter(f => f.type === 'forecast');

  const promptText = `You are a financial analyst AI. Analyze the following financial data and provide insights.

HISTORICAL DATA (${historicalData.length} months):
${JSON.stringify(historicalData, null, 2)}

COMPUTED METRICS:
- Total Revenue: $${metrics.totalRevenue.toLocaleString()}
- Total Expenses: $${metrics.totalExpenses.toLocaleString()}
- Net Profit: $${metrics.netProfit.toLocaleString()}
- Average Cash Flow: $${metrics.averageCashFlow.toLocaleString()}
- Burn Rate: $${metrics.burnRate.toLocaleString()}/month
- Runway: ${metrics.runway.toFixed(1)} months
- Revenue Growth: ${metrics.revenueGrowth.toFixed(1)}%
- Expense Growth: ${metrics.expenseGrowth.toFixed(1)}%

FORECAST (next ${forecastData.length} months):
${JSON.stringify(forecastData, null, 2)}

CATEGORY BREAKDOWN:
${JSON.stringify(categories, null, 2)}

Generate a financial analysis report with the following structure (return as JSON):
{
  "summary": "A 2-3 sentence executive summary of overall financial health",
  "trends": ["trend 1", "trend 2", "trend 3"] (3-4 key trends observed in the data),
  "anomalies": ["anomaly 1", "anomaly 2"] (any unusual spikes, drops, or patterns - if none, return empty array),
  "risks": ["risk 1", "risk 2", "risk 3"] (2-3 potential financial risks based on trends),
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"] (4-5 specific, actionable recommendations for budget optimization)
}

Focus on:
- Revenue and expense trends
- Cash flow sustainability
- Growth patterns
- Category performance
- Forecast implications
- Actionable advice

Return only valid JSON, no additional text.`;
  
  const prompt = promptText;

  try {
    const response = await window.spark.llm(prompt, 'gpt-4o', true);
    const insights = JSON.parse(response) as AIInsights;
    
    return {
      summary: insights.summary || 'Analysis complete.',
      trends: insights.trends || [],
      anomalies: insights.anomalies || [],
      risks: insights.risks || [],
      recommendations: insights.recommendations || [],
    };
  } catch (error) {
    console.error('AI Insights generation failed:', error);
    
    return {
      summary: 'Unable to generate AI insights at this time. Please review the metrics and charts for manual analysis.',
      trends: [
        `Revenue trend: ${metrics.revenueGrowth > 0 ? 'Growing' : 'Declining'} at ${Math.abs(metrics.revenueGrowth).toFixed(1)}%`,
        `Expense trend: ${metrics.expenseGrowth > 0 ? 'Increasing' : 'Decreasing'} at ${Math.abs(metrics.expenseGrowth).toFixed(1)}%`,
        `Net profit: $${metrics.netProfit.toLocaleString()}`
      ],
      anomalies: [],
      risks: [
        metrics.runway < 6 ? 'Low runway - consider reducing expenses or increasing revenue' : 'Runway appears sustainable',
        metrics.expenseGrowth > metrics.revenueGrowth ? 'Expenses growing faster than revenue' : 'Revenue growth exceeds expense growth'
      ],
      recommendations: [
        'Review detailed metrics and charts for patterns',
        'Consider category-wise budget allocation',
        'Monitor forecast trends closely',
        'Plan for seasonal variations'
      ],
    };
  }
}
