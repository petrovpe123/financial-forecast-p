import { memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ForecastData } from '@/lib/types';

interface FinancialChartProps {
  data: ForecastData[];
  title: string;
  dataKey: 'revenue' | 'expenses' | 'cash_flow';
}

export const FinancialChart = memo(function FinancialChart({ data, title, dataKey }: FinancialChartProps) {
  const chartData = useMemo(() => data.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    value: item[dataKey],
    forecast: item.type === 'forecast' ? item[dataKey] : null,
    historical: item.type === 'historical' ? item[dataKey] : null,
  })), [data, dataKey]);

  const color = useMemo(() => {
    switch (dataKey) {
      case 'revenue':
        return 'oklch(0.55 0.12 180)';
      case 'expenses':
        return 'oklch(0.35 0.02 240)';
      case 'cash_flow':
        return 'oklch(0.45 0.15 240)';
      default:
        return 'oklch(0.45 0.15 240)';
    }
  }, [dataKey]);

  const forecastColor = 'oklch(0.70 0.15 75)';

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id={`color-forecast-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={forecastColor} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={forecastColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240)" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: 'oklch(0.50 0.02 240)', fontSize: 12 }}
            stroke="oklch(0.88 0.01 240)"
          />
          <YAxis 
            tick={{ fill: 'oklch(0.50 0.02 240)', fontSize: 12 }}
            stroke="oklch(0.88 0.01 240)"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'oklch(0.99 0 0)',
              border: '1px solid oklch(0.88 0.01 240)',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            labelStyle={{ color: 'oklch(0.25 0.02 240)', fontWeight: 600 }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="historical"
            stroke={color}
            strokeWidth={3}
            fill={`url(#color-${dataKey})`}
            name="Historical"
            dot={{ fill: color, r: 4 }}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="forecast"
            stroke={forecastColor}
            strokeWidth={3}
            strokeDasharray="5 5"
            fill={`url(#color-forecast-${dataKey})`}
            name="Forecast"
            dot={{ fill: forecastColor, r: 4 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
});
