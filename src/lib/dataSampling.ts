/**
 * Data sampling utilities for chart performance optimization
 * Implements Largest Triangle Three Buckets (LTTB) algorithm for downsampling time-series data
 */

export interface DataPoint {
  [key: string]: any;
}

/**
 * Largest Triangle Three Buckets (LTTB) downsampling algorithm
 * Maintains visual fidelity while reducing the number of data points
 * 
 * @param data - Array of data points to downsample
 * @param threshold - Target number of data points after downsampling
 * @param xAccessor - Function to get x-value from data point (typically timestamp/index)
 * @param yAccessor - Function to get y-value from data point (typically the main metric)
 * @returns Downsampled array of data points
 */
export function downsampleLTTB<T extends DataPoint>(
  data: T[],
  threshold: number,
  xAccessor: (item: T, index: number) => number = (_, index) => index,
  yAccessor: (item: T) => number
): T[] {
  const dataLength = data.length;
  
  // Return original data if it's already smaller than threshold
  if (dataLength <= threshold || threshold <= 2) {
    return data;
  }

  const sampled: T[] = [];
  
  // Always include first point
  sampled.push(data[0]);
  
  // Bucket size. Leave room for start and end data points
  const bucketSize = (dataLength - 2) / (threshold - 2);
  
  let a = 0; // Initially a is the first point in the triangle
  
  for (let i = 0; i < threshold - 2; i++) {
    // Calculate point average for next bucket (containing c)
    let avgX = 0;
    let avgY = 0;
    let avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
    let avgRangeEnd = Math.floor((i + 2) * bucketSize) + 1;
    avgRangeEnd = avgRangeEnd < dataLength ? avgRangeEnd : dataLength;
    
    const avgRangeLength = avgRangeEnd - avgRangeStart;
    
    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      avgX += xAccessor(data[avgRangeStart], avgRangeStart);
      avgY += yAccessor(data[avgRangeStart]);
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;
    
    // Get the range for this bucket
    let rangeOffs = Math.floor(i * bucketSize) + 1;
    const rangeTo = Math.floor((i + 1) * bucketSize) + 1;
    
    // Point a
    const pointAX = xAccessor(data[a], a);
    const pointAY = yAccessor(data[a]);
    
    let maxArea = -1;
    let maxAreaPoint = rangeOffs;
    
    for (; rangeOffs < rangeTo; rangeOffs++) {
      // Calculate triangle area over three buckets
      const pointX = xAccessor(data[rangeOffs], rangeOffs);
      const pointY = yAccessor(data[rangeOffs]);
      
      const area = Math.abs(
        (pointAX - avgX) * (pointY - pointAY) -
        (pointAX - pointX) * (avgY - pointAY)
      ) * 0.5;
      
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = rangeOffs;
      }
    }
    
    sampled.push(data[maxAreaPoint]);
    a = maxAreaPoint; // This is the next a
  }
  
  // Always include last point
  sampled.push(data[dataLength - 1]);
  
  return sampled;
}

/**
 * Simple decimation downsampling - takes every nth point
 * Faster but less accurate than LTTB
 * 
 * @param data - Array of data points to downsample
 * @param threshold - Target number of data points after downsampling
 * @returns Downsampled array of data points
 */
export function downsampleDecimation<T extends DataPoint>(
  data: T[],
  threshold: number
): T[] {
  const dataLength = data.length;
  
  if (dataLength <= threshold) {
    return data;
  }
  
  const sampled: T[] = [];
  const step = dataLength / threshold;
  
  for (let i = 0; i < dataLength; i += step) {
    sampled.push(data[Math.floor(i)]);
  }
  
  // Always include last point if not already included
  if (sampled[sampled.length - 1] !== data[dataLength - 1]) {
    sampled.push(data[dataLength - 1]);
  }
  
  return sampled;
}

/**
 * Determines if data should be downsampled based on threshold
 * 
 * @param dataLength - Length of the data array
 * @param threshold - Threshold above which to apply downsampling (default: 500)
 * @returns Whether downsampling should be applied
 */
export function shouldDownsample(dataLength: number, threshold: number = 500): boolean {
  return dataLength > threshold;
}
