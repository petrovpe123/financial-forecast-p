import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CategoryBreakdown } from '@/lib/types';
import { useMemo } from 'react';

interface CategoryChartProps {
  data: CategoryBreakdown[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = useMemo(() => {
    const transformedData = data.map(item => ({
      category: item.category,
      revenue: item.revenue,
      expenses: item.expenses,
    }));

    // If we have too many categories, show only top N by total value
    const maxCategories = 20;
    if (transformedData.length > maxCategories) {
      // Sort by total value (revenue + expenses) descending
      const sortedData = transformedData
        .sort((a, b) => (b.revenue + b.expenses) - (a.revenue + a.expenses))
        .slice(0, maxCategories);
      
      // Calculate "Others" category from remaining items
      const othersData = transformedData.slice(maxCategories);
      if (othersData.length > 0) {
        const othersRevenue = othersData.reduce((sum, item) => sum + item.revenue, 0);
        const othersExpenses = othersData.reduce((sum, item) => sum + item.expenses, 0);
        sortedData.push({
          category: `Others (${othersData.length})`,
          revenue: othersRevenue,
          expenses: othersExpenses,
        });
      }
      
      return sortedData;
    }

    return transformedData;
  }, [data]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240)" />
          <XAxis 
            dataKey="category" 
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
            formatter={(value: number) => `$${value.toLocaleString()}`}
            labelStyle={{ color: 'oklch(0.25 0.02 240)', fontWeight: 600 }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          <Bar 
            dataKey="revenue" 
            fill="oklch(0.55 0.12 180)" 
            radius={[8, 8, 0, 0]}
            name="Revenue"
          />
          <Bar 
            dataKey="expenses" 
            fill="oklch(0.35 0.02 240)" 
            radius={[8, 8, 0, 0]}
            name="Expenses"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
