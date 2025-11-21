import { describe, it, expect } from 'vitest';
import { parseCSV } from '../lib/csvParser';

describe('CSV Parser', () => {
  it('should parse valid CSV data correctly', () => {
    const csvContent = `timestamp,revenue,expenses,cash_flow,category
2024-01-01,10000,5000,5000,Sales
2024-02-01,12000,6000,6000,Sales
2024-03-01,15000,7000,8000,Marketing`;

    const result = parseCSV(csvContent);

    expect(result.valid).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.length).toBe(3);
    expect(result.data?.[0].revenue).toBe(10000);
    expect(result.data?.[0].expenses).toBe(5000);
    expect(result.data?.[0].category).toBe('Sales');
  });

  it('should fail when required columns are missing', () => {
    const csvContent = `timestamp,revenue,expenses
2024-01-01,10000,5000
2024-02-01,12000,6000`;

    const result = parseCSV(csvContent);

    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toContain('Missing required columns');
  });

  it('should skip rows with invalid numeric values', () => {
    const csvContent = `timestamp,revenue,expenses,cash_flow,category
2024-01-01,10000,5000,5000,Sales
2024-02-01,invalid,6000,6000,Sales
2024-03-01,15000,7000,8000,Marketing
2024-04-01,20000,8000,12000,Sales`;

    const result = parseCSV(csvContent);

    expect(result.valid).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.length).toBe(3); // One row skipped
    expect(result.errors).toBeDefined();
    expect(result.errors?.some(e => e.includes('Invalid numeric values'))).toBe(true);
  });

  it('should fail when insufficient data is provided', () => {
    const csvContent = `timestamp,revenue,expenses,cash_flow,category
2024-01-01,10000,5000,5000,Sales
2024-02-01,12000,6000,6000,Sales`;

    const result = parseCSV(csvContent);

    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toContain('At least 3 months of data are required');
  });
});
