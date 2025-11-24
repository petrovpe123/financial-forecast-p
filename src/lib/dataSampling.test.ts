import { describe, it, expect } from 'vitest';
import { sampleChartData, sampleWithExtremes, aggregateData } from '@/lib/dataSampling';

describe('Data Sampling Utilities', () => {
  describe('sampleChartData', () => {
    it('should return original data when length is less than maxPoints', () => {
      // Test 1: No sampling needed for small datasets
      const data = [
        { value: 1, label: 'a' },
        { value: 2, label: 'b' },
        { value: 3, label: 'c' },
      ];
      const result = sampleChartData(data, 10);
      
      expect(result).toHaveLength(3);
      expect(result).toEqual(data);
    });

    it('should sample data evenly and preserve first and last points', () => {
      // Test 2: Even sampling with first/last preservation
      const data = Array.from({ length: 100 }, (_, i) => ({ 
        value: i, 
        label: `item-${i}` 
      }));
      const result = sampleChartData(data, 10);
      
      expect(result).toHaveLength(10);
      expect(result[0]).toEqual(data[0]); // First point preserved
      expect(result[result.length - 1]).toEqual(data[data.length - 1]); // Last point preserved
      
      // Check that sampling is roughly even
      const indices = result.map(item => item.value);
      for (let i = 1; i < indices.length; i++) {
        const gap = indices[i] - indices[i - 1];
        expect(gap).toBeGreaterThan(0); // Ascending order maintained
      }
    });

    it('should handle empty array gracefully', () => {
      // Test 3: Edge case - empty array
      const data: Array<{ value: number }> = [];
      const result = sampleChartData(data, 10);
      
      expect(result).toHaveLength(0);
    });

    it('should throw error when maxPoints is less than 2', () => {
      const data = [{ value: 1 }, { value: 2 }, { value: 3 }];
      
      expect(() => sampleChartData(data, 1)).toThrow('maxPoints must be at least 2');
      expect(() => sampleChartData(data, 0)).toThrow('maxPoints must be at least 2');
    });
  });

  describe('sampleWithExtremes', () => {
    it('should preserve min and max values along with first and last points', () => {
      // Test 4: Extreme value preservation
      const data = [
        { value: 10, id: 1 },   // First
        { value: 50, id: 2 },
        { value: 5, id: 3 },    // Min
        { value: 30, id: 4 },
        { value: 100, id: 5 },  // Max
        { value: 40, id: 6 },
        { value: 20, id: 7 },   // Last
      ];
      const result = sampleWithExtremes(data, 5, 'value');
      
      expect(result.length).toBeLessThanOrEqual(5);
      
      // Verify first, last, min, and max are present
      const values = result.map(item => item.value);
      expect(values).toContain(10);  // First
      expect(values).toContain(20);  // Last
      expect(values).toContain(5);   // Min
      expect(values).toContain(100); // Max
      
      // Order should be maintained
      const ids = result.map(item => item.id);
      for (let i = 1; i < ids.length; i++) {
        expect(ids[i]).toBeGreaterThan(ids[i - 1]);
      }
    });

    it('should handle data where min/max are at boundaries', () => {
      // Test 5: Min/max at first/last positions
      const data = [
        { value: 100, id: 1 },  // First and Max
        { value: 50, id: 2 },
        { value: 30, id: 3 },
        { value: 20, id: 4 },
        { value: 5, id: 5 },    // Last and Min
      ];
      const result = sampleWithExtremes(data, 4, 'value');
      
      expect(result.length).toBeLessThanOrEqual(4);
      
      // Should still preserve all critical points
      const values = result.map(item => item.value);
      expect(values).toContain(100); // First/Max
      expect(values).toContain(5);   // Last/Min
    });

    it('should handle empty array gracefully', () => {
      const data: Array<{ value: number; id: number }> = [];
      const result = sampleWithExtremes(data, 5, 'value');
      
      expect(result).toHaveLength(0);
    });

    it('should throw error when maxPoints is less than 2 for non-empty data', () => {
      const data = [{ value: 1 }, { value: 2 }, { value: 3 }];
      
      expect(() => sampleWithExtremes(data, 1, 'value')).toThrow('maxPoints must be at least 2');
    });
  });

  describe('aggregateData', () => {
    it('should aggregate data into specified number of groups', () => {
      const data = Array.from({ length: 10 }, (_, i) => ({ 
        value: i + 1,
        category: `cat-${i}` 
      }));
      
      const aggregateFn = (group: typeof data) => ({
        value: group.reduce((sum, item) => sum + item.value, 0),
        category: group[0].category,
      });
      
      const result = aggregateData(data, 3, aggregateFn);
      
      expect(result).toHaveLength(3);
      // First group should have sum of first ~3-4 items
      expect(result[0].value).toBeGreaterThan(0);
    });

    it('should return original data when maxGroups is greater than data length', () => {
      const data = [
        { value: 1, name: 'a' },
        { value: 2, name: 'b' },
      ];
      
      const aggregateFn = (group: typeof data) => group[0];
      const result = aggregateData(data, 10, aggregateFn);
      
      expect(result).toHaveLength(2);
      expect(result).toEqual(data);
    });
  });
});
