import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { FileUpload } from '@/components/FileUpload';
import { MetricCard } from '@/components/MetricCard';
import { FinancialChart } from '@/components/FinancialChart';
import { CategoryChart } from '@/components/CategoryChart';
import { AIReportPanel } from '@/components/AIReportPanel';
import { DataTable } from '@/components/DataTable';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { parseCSV } from '@/lib/csvParser';
import { calculateMetrics, calculateCategoryBreakdown } from '@/lib/metrics';
import { generateForecast, calculateForecastAccuracy } from '@/lib/forecasting';
import { generateAIInsights } from '@/lib/aiInsights';
import { FinancialRecord, FinancialMetrics, ForecastData, AIInsights, CategoryBreakdown } from '@/lib/types';
import { Money, Receipt, TrendUp, ChartLine, ArrowsClockwise, Warning } from '@phosphor-icons/react';

function App() {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [categories, setCategories] = useState<CategoryBreakdown[]>([]);
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [forecastAccuracy, setForecastAccuracy] = useState<number>(0);

  const handleFileUpload = async (content: string) => {
    setIsProcessing(true);
    setErrors([]);
    
    try {
      const result = parseCSV(content);
      
      if (!result.valid || !result.data) {
        setErrors(result.errors || ['Failed to parse CSV']);
        toast.error('CSV validation failed', {
          description: result.errors?.[0] || 'Please check your file format'
        });
        setIsProcessing(false);
        return;
      }

      if (result.errors && result.errors.length > 0) {
        toast.warning('Some rows had issues', {
          description: `${result.errors.length} rows were skipped due to validation errors`
        });
      }

      setRecords(result.data);
      
      const calculatedMetrics = calculateMetrics(result.data);
      setMetrics(calculatedMetrics);

      const forecastData = generateForecast(result.data, 6);
      setForecast(forecastData);

      const accuracy = calculateForecastAccuracy(result.data);
      setForecastAccuracy(accuracy);

      const categoryData = calculateCategoryBreakdown(result.data);
      setCategories(categoryData);

      toast.success('Data processed successfully', {
        description: `${result.data.length} records loaded`
      });

      setIsProcessing(false);
      setIsAnalyzing(true);

      const aiInsights = await generateAIInsights(result.data, calculatedMetrics, forecastData, categoryData);
      setInsights(aiInsights);
      setIsAnalyzing(false);

      toast.success('AI analysis complete');

    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Failed to process data', {
        description: 'An unexpected error occurred'
      });
      setIsProcessing(false);
      setIsAnalyzing(false);
    }
  };

  const handleRefresh = async () => {
    if (records.length === 0) return;

    setIsAnalyzing(true);
    
    try {
      const calculatedMetrics = calculateMetrics(records);
      setMetrics(calculatedMetrics);

      const forecastData = generateForecast(records, 6);
      setForecast(forecastData);

      const accuracy = calculateForecastAccuracy(records);
      setForecastAccuracy(accuracy);

      const categoryData = calculateCategoryBreakdown(records);
      setCategories(categoryData);

      const aiInsights = await generateAIInsights(records, calculatedMetrics, forecastData, categoryData);
      setInsights(aiInsights);
      
      toast.success('Analysis refreshed');
    } catch (error) {
      console.error('Refresh error:', error);
      toast.error('Failed to refresh analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Financial Forecasting & Budget Automation
            </h1>
            <div className="flex items-center gap-2">
              {records.length > 0 && (
                <Button 
                  onClick={handleRefresh} 
                  disabled={isAnalyzing}
                  variant="outline"
                >
                  <ArrowsClockwise className={isAnalyzing ? 'animate-spin' : ''} />
                  Refresh Analysis
                </Button>
              )}
              <ThemeSwitcher />
            </div>
          </div>
          <p className="text-muted-foreground">
            Transform financial data into actionable insights with AI-powered analysis and forecasting
          </p>
        </header>

        {errors.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <Warning weight="duotone" className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {errors.slice(0, 5).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
                {errors.length > 5 && <li>...and {errors.length - 5} more issues</li>}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />

          {metrics && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  label="Total Revenue"
                  value={metrics.totalRevenue}
                  format="currency"
                  trend={metrics.revenueGrowth}
                  icon={<Money size={48} weight="duotone" />}
                  delay={0}
                />
                <MetricCard
                  label="Total Expenses"
                  value={metrics.totalExpenses}
                  format="currency"
                  trend={metrics.expenseGrowth}
                  icon={<Receipt size={48} weight="duotone" />}
                  delay={100}
                />
                <MetricCard
                  label="Net Profit"
                  value={metrics.netProfit}
                  format="currency"
                  icon={<TrendUp size={48} weight="duotone" />}
                  delay={200}
                />
                <MetricCard
                  label="Runway"
                  value={metrics.runway}
                  format="number"
                  icon={<ChartLine size={48} weight="duotone" />}
                  delay={300}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricCard
                  label="Average Cash Flow"
                  value={metrics.averageCashFlow}
                  format="currency"
                  delay={400}
                />
                <MetricCard
                  label="Monthly Burn Rate"
                  value={metrics.burnRate}
                  format="currency"
                  delay={500}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Tabs defaultValue="revenue" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="revenue">Revenue</TabsTrigger>
                      <TabsTrigger value="expenses">Expenses</TabsTrigger>
                      <TabsTrigger value="cash_flow">Cash Flow</TabsTrigger>
                    </TabsList>
                    <TabsContent value="revenue" className="mt-6">
                      <FinancialChart 
                        data={forecast} 
                        title={`Revenue Trend & Forecast (${forecastAccuracy}% accuracy)`}
                        dataKey="revenue" 
                      />
                    </TabsContent>
                    <TabsContent value="expenses" className="mt-6">
                      <FinancialChart 
                        data={forecast} 
                        title="Expenses Trend & Forecast"
                        dataKey="expenses" 
                      />
                    </TabsContent>
                    <TabsContent value="cash_flow" className="mt-6">
                      <FinancialChart 
                        data={forecast} 
                        title="Cash Flow Trend & Forecast"
                        dataKey="cash_flow" 
                      />
                    </TabsContent>
                  </Tabs>

                  <CategoryChart data={categories} />
                  <DataTable data={records} />
                </div>

                <div className="lg:col-span-1">
                  <AIReportPanel insights={insights} isLoading={isAnalyzing} />
                </div>
              </div>
            </>
          )}

          {records.length === 0 && !isProcessing && (
            <div className="text-center py-12">
              <ChartLine size={64} weight="duotone" className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Data Yet</h3>
              <p className="text-muted-foreground">
                Upload a CSV file to get started with financial analysis and forecasting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;