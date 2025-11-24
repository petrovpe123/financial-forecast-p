/**
 * Data sampling utilities for chart performance optimization
 * Reduces data points while preserving visual fidelity and key trends
 */

/**
 * Sample data points intelligently to reduce chart rendering overhead
 * Preserves first and last points, then samples evenly from remaining points
 * 
 * @param data Array of data items to sample
 * @param maxPoints Maximum number of points to return (must be at least 2)
 * @returns Sampled array maintaining visual fidelity
 */
export function sampleChartData<T extends Record<string, any>>(
  data: T[],
  maxPoints: number
): T[] {
  // If data is already within limits, return as-is
  if (data.length <= maxPoints) {
    return data;
  }

  // Validate maxPoints is sufficient
  if (maxPoints < 2) {
    throw new Error('maxPoints must be at least 2 to preserve first and last points');
  }

  // Always preserve first and last points
  const sampledData: T[] = [data[0]];
  const pointsToSample = maxPoints - 2; // Subtract first and last

  // Calculate step size for even sampling
  const step = (data.length - 1) / (pointsToSample + 1);

  // Sample points at regular intervals
  for (let i = 1; i < pointsToSample + 1; i++) {
    const index = Math.round(step * i);
    sampledData.push(data[index]);
  }

  // Add last point
  sampledData.push(data[data.length - 1]);

  return sampledData;
}

/**
 * Sample data with value-based prioritization
 * Preserves extreme values (min/max) for a given key to maintain chart accuracy
 * 
 * @param data Array of data items to sample
 * @param maxPoints Maximum number of points to return (must be at least 2)
 * @param valueKey Key to use for finding min/max values
 * @returns Sampled array preserving extreme values
 */
export function sampleWithExtremes<T extends Record<string, any>>(
  data: T[],
  maxPoints: number,
  valueKey: keyof T
): T[] {
  if (data.length <= maxPoints) {
    return data;
  }

  // Validate inputs
  if (data.length === 0) {
    return [];
  }

  if (maxPoints < 2) {
    throw new Error('maxPoints must be at least 2 to preserve first and last points');
  }

  // Find indices of min and max values
  let minIndex = 0;
  let maxIndex = 0;
  let minValue = data[0][valueKey];
  let maxValue = data[0][valueKey];

  for (let i = 1; i < data.length; i++) {
    const value = data[i][valueKey];
    if (value < minValue) {
      minValue = value;
      minIndex = i;
    }
    if (value > maxValue) {
      maxValue = value;
      maxIndex = i;
    }
  }

  // Create set of indices to preserve
  const preserveIndices = new Set([0, data.length - 1, minIndex, maxIndex]);
  
  // Calculate how many more points we need
  const pointsNeeded = maxPoints - preserveIndices.size;
  
  // Only add more points if we haven't exceeded maxPoints
  if (pointsNeeded > 0) {
    const step = data.length / (pointsNeeded + 1);
    for (let i = 1; i <= pointsNeeded; i++) {
      const index = Math.round(step * i);
      if (index > 0 && index < data.length - 1) {
        preserveIndices.add(index);
        // Stop if we've reached maxPoints
        if (preserveIndices.size >= maxPoints) {
          break;
        }
      }
    }
  }

  // Sort indices and return sampled data
  const sortedIndices = Array.from(preserveIndices).sort((a, b) => a - b);
  return sortedIndices.map(i => data[i]);
}

/**
 * Aggregate data by grouping consecutive items
 * Useful for bar charts where aggregation makes more sense than sampling
 * 
 * @param data Array of data items to aggregate
 * @param maxGroups Maximum number of groups to create
 * @param aggregationFn Function to aggregate values in a group
 * @returns Aggregated array
 */
export function aggregateData<T extends Record<string, any>>(
  data: T[],
  maxGroups: number,
  aggregationFn: (group: T[]) => T
): T[] {
  if (data.length <= maxGroups) {
    return data;
  }

  const groupSize = Math.ceil(data.length / maxGroups);
  const aggregated: T[] = [];

  for (let i = 0; i < data.length; i += groupSize) {
    const group = data.slice(i, Math.min(i + groupSize, data.length));
    aggregated.push(aggregationFn(group));
  }

  return aggregated;
}
