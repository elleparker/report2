// Performance testing utilities for chart animations
export interface PerformanceMetrics {
  renderTime: number;
  animationDuration: number;
  memoryUsage: number;
  frameRate: number;
}

// Generate large dataset for performance testing
export function generateLargeDataset(size: number) {
  const categories = ['Organic', 'Plastic', 'Paper', 'Glass', 'Metal', 'Electronics', 'Textile', 'Hazardous'];
  const dataset = [];
  
  for (let i = 0; i < size; i++) {
    dataset.push({
      category: categories[i % categories.length] + ` ${Math.floor(i / categories.length) + 1}`,
      percentage: Math.floor(Math.random() * 60) + 10,
      recycling_rate: Math.floor(Math.random() * 80) + 5,
      id: i
    });
  }
  
  return dataset;
}

// Performance monitoring utility
export class ChartPerformanceMonitor {
  private startTime: number = 0;
  private frameCount: number = 0;
  private frameStart: number = 0;
  
  startMeasurement() {
    this.startTime = performance.now();
    this.frameCount = 0;
    this.frameStart = performance.now();
  }
  
  endMeasurement(): PerformanceMetrics {
    const endTime = performance.now();
    const renderTime = endTime - this.startTime;
    
    // Get memory usage if available
    const memory = (performance as any).memory;
    const memoryUsage = memory ? memory.usedJSHeapSize / 1024 / 1024 : 0; // MB
    
    return {
      renderTime,
      animationDuration: 0.8 * 1000, // 800ms from our animation
      memoryUsage,
      frameRate: this.calculateFrameRate()
    };
  }
  
  private calculateFrameRate(): number {
    const now = performance.now();
    const elapsed = now - this.frameStart;
    return elapsed > 0 ? (this.frameCount * 1000) / elapsed : 0;
  }
  
  logPerformanceWarning(metrics: PerformanceMetrics, datasetSize: number) {
    console.group(`🚀 Chart Performance Report (Dataset: ${datasetSize} items)`);
    
    if (metrics.renderTime > 1000) {
      console.warn(`⚠️ Slow render time: ${metrics.renderTime.toFixed(2)}ms`);
    } else {
      console.log(`✅ Render time: ${metrics.renderTime.toFixed(2)}ms`);
    }
    
    if (metrics.memoryUsage > 50) {
      console.warn(`⚠️ High memory usage: ${metrics.memoryUsage.toFixed(2)}MB`);
    } else {
      console.log(`✅ Memory usage: ${metrics.memoryUsage.toFixed(2)}MB`);
    }
    
    if (metrics.frameRate < 30) {
      console.warn(`⚠️ Low frame rate: ${metrics.frameRate.toFixed(2)}fps`);
    } else {
      console.log(`✅ Frame rate: ${metrics.frameRate.toFixed(2)}fps`);
    }
    
    console.groupEnd();
    
    // Return recommendations
    return {
      shouldOptimize: metrics.renderTime > 1000 || metrics.memoryUsage > 50,
      recommendations: this.getOptimizationRecommendations(metrics, datasetSize)
    };
  }
  
  private getOptimizationRecommendations(metrics: PerformanceMetrics, datasetSize: number): string[] {
    const recommendations: string[] = [];
    
    if (datasetSize > 100) {
      recommendations.push('Consider data virtualization for datasets > 100 items');
    }
    
    if (metrics.renderTime > 1000) {
      recommendations.push('Consider reducing animation complexity');
      recommendations.push('Implement lazy loading for chart components');
    }
    
    if (metrics.memoryUsage > 50) {
      recommendations.push('Consider data pagination');
      recommendations.push('Implement component cleanup on unmount');
    }
    
    return recommendations;
  }
}

// Optimized animation configurations for different dataset sizes
export function getOptimizedAnimationConfig(datasetSize: number) {
  if (datasetSize <= 10) {
    return {
      duration: 0.8,
      staggerDelay: 0.1,
      easing: "easeOut"
    };
  } else if (datasetSize <= 50) {
    return {
      duration: 0.6,
      staggerDelay: 0.05,
      easing: "easeOut"
    };
  } else if (datasetSize <= 100) {
    return {
      duration: 0.4,
      staggerDelay: 0.02,
      easing: "easeOut"
    };
  } else {
    // For very large datasets, disable stagger to improve performance
    return {
      duration: 0.3,
      staggerDelay: 0,
      easing: "easeOut"
    };
  }
}

// React hook for performance monitoring
export function useChartPerformance(datasetSize: number) {
  const monitor = new ChartPerformanceMonitor();
  
  return {
    startMeasurement: () => monitor.startMeasurement(),
    endMeasurement: () => monitor.endMeasurement(),
    logPerformance: (metrics: PerformanceMetrics) => 
      monitor.logPerformanceWarning(metrics, datasetSize),
    getOptimizedConfig: () => getOptimizedAnimationConfig(datasetSize)
  };
}
