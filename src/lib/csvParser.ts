import { FinancialRecord } from './types';

export interface CSVValidationResult {
  valid: boolean;
  data?: FinancialRecord[];
  errors?: string[];
}

export function parseCSV(csvText: string): CSVValidationResult {
  const errors: string[] = [];
  const lines = csvText.trim().split('\n');

  if (lines.length < 2) {
    return { valid: false, errors: ['CSV file must contain at least a header and one data row'] };
  }

  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  const requiredColumns = ['timestamp', 'revenue', 'expenses', 'cash_flow', 'category'];
  
  const missingColumns = requiredColumns.filter(col => !header.includes(col));
  if (missingColumns.length > 0) {
    return { valid: false, errors: [`Missing required columns: ${missingColumns.join(', ')}`] };
  }

  const columnIndices = {
    timestamp: header.indexOf('timestamp'),
    revenue: header.indexOf('revenue'),
    expenses: header.indexOf('expenses'),
    cash_flow: header.indexOf('cash_flow'),
    category: header.indexOf('category'),
  };

  const records: FinancialRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    
    if (values.length < requiredColumns.length) {
      errors.push(`Row ${i}: Incomplete data`);
      continue;
    }

    const timestamp = values[columnIndices.timestamp];
    const revenue = parseFloat(values[columnIndices.revenue]);
    const expenses = parseFloat(values[columnIndices.expenses]);
    const cash_flow = parseFloat(values[columnIndices.cash_flow]);
    const category = values[columnIndices.category] || 'Uncategorized';

    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      errors.push(`Row ${i}: Invalid timestamp format`);
      continue;
    }

    if (isNaN(revenue) || isNaN(expenses) || isNaN(cash_flow)) {
      errors.push(`Row ${i}: Invalid numeric values`);
      continue;
    }

    if (revenue < 0 || expenses < 0) {
      errors.push(`Row ${i}: Revenue and expenses cannot be negative`);
      continue;
    }

    const recordDate = new Date(timestamp);
    if (recordDate > new Date()) {
      errors.push(`Row ${i}: Future dates are not allowed`);
      continue;
    }

    records.push({
      timestamp,
      revenue,
      expenses,
      cash_flow,
      category,
    });
  }

  if (records.length < 3) {
    return { 
      valid: false, 
      errors: ['At least 3 months of data are required for forecasting'] 
    };
  }

  const sortedRecords = records.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return { valid: true, data: sortedRecords, errors: errors.length > 0 ? errors : undefined };
}
