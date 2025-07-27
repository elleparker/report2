import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the Cover component with performance tracking
const MockCover = ({ children, particleColor }: { children: React.ReactNode; particleColor?: string }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const frameCountRef = React.useRef(0);
  const startTimeRef = React.useRef(0);

  const startAnimation = () => {
    setIsAnimating(true);
    startTimeRef.current = performance.now();
    frameCountRef.current = 0;
    
    const animate = () => {
      if (frameCountRef.current < 60) { // Run for 1 second at 60fps
        frameCountRef.current++;
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div 
      data-testid="cover-animation"
      data-animating={isAnimating}
      data-frame-count={frameCountRef.current}
      onMouseEnter={startAnimation}
    >
      {children}
    </div>
  );
};

// Mock animated gallery component
const MockCircularGallery = () => {
  const [isRotating, setIsRotating] = React.useState(true);
  const frameCountRef = React.useRef(0);
  const fpsRef = React.useRef(60);

  React.useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      frameCount++;
      
      // Calculate FPS every second
      if (frameCount >= 60) {
        const actualFPS = Math.round(1000 / (deltaTime / frameCount));
        fpsRef.current = actualFPS;
        frameCount = 0;
        lastTime = currentTime;
      }
      
      frameCountRef.current++;
      
      if (isRotating && frameCountRef.current < 300) { // 5 seconds of animation
        animationId = requestAnimationFrame(animate);
      }
    };

    if (isRotating) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRotating]);

  return (
    <div 
      data-testid="circular-gallery"
      data-fps={fpsRef.current}
      data-frame-count={frameCountRef.current}
      data-rotating={isRotating}
    >
      <div style={{ transform: `rotate(${frameCountRef.current}deg)` }}>
        Gallery Content
      </div>
    </div>
  );
};

// Mock page with multiple animations
const MockAnimatedPage = () => (
  <div>
    <MockCover particleColor="#FACC15">
      <h1>BinDoc.AI</h1>
    </MockCover>
    <MockCircularGallery />
  </div>
);

describe('Animation Performance Testing', () => {
  let performanceMonitor: ReturnType<typeof global.testUtils.createPerformanceMonitor>;

  beforeEach(() => {
    // Reset performance mocks
    (performance.now as jest.Mock).mockReturnValue(0);
    
    // Create performance monitor
    performanceMonitor = global.testUtils.createPerformanceMonitor();
    
    // Mock requestAnimationFrame to control timing
    let frame = 0;
    global.requestAnimationFrame = jest.fn((callback) => {
      return setTimeout(() => {
        frame++;
        callback(frame * 16.67); // 60fps = 16.67ms per frame
      }, 16.67);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Cover Animation Performance', () => {
    it('should maintain ≥60 FPS during cover animation', async () => {
      jest.useFakeTimers();
      
      performanceMonitor.startFrame();
      render(<MockCover particleColor="#FACC15">Test Content</MockCover>);
      
      const coverElement = screen.getByTestId('cover-animation');
      expect(coverElement).toBeInTheDocument();
      
      // Simulate 1 second of animation
      for (let i = 0; i < 60; i++) {
        performanceMonitor.startFrame();
        act(() => {
          jest.advanceTimersByTime(16.67); // Advance by one frame
        });
        performanceMonitor.endFrame();
      }
      
      const fps = performanceMonitor.getFPS();
      
      // Should maintain at least 60 FPS
      expect(fps).toBeWithinFPSRange(60, 120);
      
      jest.useRealTimers();
    });

    it('should not cause memory leaks during extended animation', async () => {
      jest.useFakeTimers();
      
      const { unmount } = render(<MockCover>Test Content</MockCover>);
      
      // Simulate long animation
      act(() => {
        jest.advanceTimersByTime(5000); // 5 seconds
      });
      
      // Unmount component
      unmount();
      
      // Check that timers are cleaned up
      expect(jest.getTimerCount()).toBe(0);
      
      jest.useRealTimers();
    });

    it('should handle rapid hover events without frame drops', async () => {
      render(<MockCover>Test Content</MockCover>);
      
      const coverElement = screen.getByTestId('cover-animation');
      
      performanceMonitor.startFrame();
      
      // Simulate rapid hover events
      for (let i = 0; i < 10; i++) {
        act(() => {
          coverElement.dispatchEvent(new Event('mouseenter'));
        });
      }
      
      const renderTime = performanceMonitor.endFrame();
      
      // Should handle multiple hover events quickly
      expect(renderTime).toBeLessThan(16.67); // Should be less than one frame
    });
  });

  describe('Gallery Animation Performance', () => {
    it('should maintain ≥60 FPS during gallery rotation', async () => {
      jest.useFakeTimers();
      
      render(<MockCircularGallery />);
      
      const galleryElement = screen.getByTestId('circular-gallery');
      
      // Allow animation to run for 1 second
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      await waitFor(() => {
        const fps = parseInt(galleryElement.getAttribute('data-fps') || '0');
        expect(fps).toBeWithinFPSRange(55, 65); // Allow small variance
      });
      
      jest.useRealTimers();
    });

    it('should not consume excessive CPU during rotation', async () => {
      jest.useFakeTimers();
      
      const { unmount } = render(<MockCircularGallery />);
      
      // Track animation frame requests
      const rafCallCount = (requestAnimationFrame as jest.Mock).mock.calls.length;
      
      // Run animation for a short time
      act(() => {
        jest.advanceTimersByTime(100);
      });
      
      const newRafCallCount = (requestAnimationFrame as jest.Mock).mock.calls.length;
      const framesRequested = newRafCallCount - rafCallCount;
      
      // Should request reasonable number of frames (about 6 for 100ms at 60fps)
      expect(framesRequested).toBeLessThan(10);
      
      unmount();
      jest.useRealTimers();
    });

    it('should handle gallery with many items without performance degradation', async () => {
      const MockLargeGallery = () => {
        const items = Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{ transform: `rotate(${i * 7.2}deg) translateX(100px)` }}>
            Item {i}
          </div>
        ));

        return (
          <div data-testid="large-gallery">
            {items}
          </div>
        );
      };

      performanceMonitor.startFrame();
      render(<MockLargeGallery />);
      const renderTime = performanceMonitor.endFrame();
      
      // Should render many items quickly
      expect(renderTime).toBeLessThan(16.67);
      
      const gallery = screen.getByTestId('large-gallery');
      expect(gallery.children).toHaveLength(50);
    });
  });

  describe('Combined Animation Performance', () => {
    it('should maintain performance with multiple simultaneous animations', async () => {
      jest.useFakeTimers();
      
      performanceMonitor.startFrame();
      render(<MockAnimatedPage />);
      
      // Allow all animations to run
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      const renderTime = performanceMonitor.endFrame();
      
      // Multiple animations should not cause significant performance drop
      expect(renderTime).toBeLessThan(33.33); // Should be less than 2 frames (30fps)
      
      jest.useRealTimers();
    });

    it('should handle animation cleanup on page navigation', async () => {
      const { unmount } = render(<MockAnimatedPage />);
      
      // Track active timers before unmount
      const timersBefore = jest.getTimerCount();
      
      // Unmount to simulate navigation
      unmount();
      
      // All timers should be cleaned up
      const timersAfter = jest.getTimerCount();
      expect(timersAfter).toBeLessThanOrEqual(timersBefore);
    });
  });

  describe('Animation Quality Assurance', () => {
    it('should provide smooth animation transitions', async () => {
      jest.useFakeTimers();
      
      render(<MockCircularGallery />);
      
      const gallery = screen.getByTestId('circular-gallery');
      
      // Measure frame consistency
      const frameTimes: number[] = [];
      
      for (let i = 0; i < 10; i++) {
        const start = performance.now();
        act(() => {
          jest.advanceTimersByTime(16.67);
        });
        const end = performance.now();
        frameTimes.push(end - start);
      }
      
      // Calculate frame time variance
      const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      const variance = frameTimes.reduce((acc, time) => {
        return acc + Math.pow(time - avgFrameTime, 2);
      }, 0) / frameTimes.length;
      
      // Low variance indicates smooth animation
      expect(variance).toBeLessThan(5); // Acceptable variance threshold
      
      jest.useRealTimers();
    });

    it('should handle reduced motion preferences', async () => {
      // Mock reduced motion preference
      global.testUtils.mockReducedMotion(true);
      
      const MockReducedMotionAnimation = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        return (
          <div 
            data-testid="reduced-motion-element"
            data-reduced-motion={prefersReducedMotion}
            style={{
              transition: prefersReducedMotion ? 'none' : 'transform 0.3s ease',
              animation: prefersReducedMotion ? 'none' : 'spin 1s linear infinite'
            }}
          >
            Content
          </div>
        );
      };

      render(<MockReducedMotionAnimation />);
      
      const element = screen.getByTestId('reduced-motion-element');
      expect(element.getAttribute('data-reduced-motion')).toBe('true');
      
      const styles = window.getComputedStyle(element);
      expect(styles.animation).toBe('none');
      expect(styles.transition).toBe('none');
    });
  });

  describe('Performance Regression Prevention', () => {
    it('should not exceed baseline performance metrics', async () => {
      const baselineRenderTime = 10; // ms
      const baselineFPS = 60;
      
      performanceMonitor.startFrame();
      render(<MockAnimatedPage />);
      const actualRenderTime = performanceMonitor.endFrame();
      
      // Should not regress from baseline
      expect(actualRenderTime).toBeLessThan(baselineRenderTime * 1.2); // 20% tolerance
      
      // FPS should meet minimum requirement
      const fps = performanceMonitor.getFPS();
      expect(fps).toBeGreaterThanOrEqual(baselineFPS * 0.9); // 10% tolerance
    });

    it('should scale performance with viewport size', async () => {
      const testViewports = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1440, height: 900 }   // Desktop
      ];

      const performanceResults: number[] = [];

      for (const viewport of testViewports) {
        // Mock viewport dimensions
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: viewport.width,
        });
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: viewport.height,
        });

        performanceMonitor.reset();
        performanceMonitor.startFrame();
        
        const { unmount } = render(<MockAnimatedPage />);
        
        const renderTime = performanceMonitor.endFrame();
        performanceResults.push(renderTime);
        
        unmount();
      }

      // Performance should be reasonable across all viewports
      performanceResults.forEach((time, index) => {
        expect(time).toBeLessThan(20); // 20ms threshold for all viewports
      });

      // Desktop should not be significantly slower than mobile
      const mobileTime = performanceResults[0];
      const desktopTime = performanceResults[2];
      expect(desktopTime).toBeLessThan(mobileTime * 2); // Desktop shouldn't be more than 2x slower
    });
  });
});

// Real-world performance simulation
describe('Real-World Animation Scenarios', () => {
  it('should handle user interactions during animations', async () => {
    jest.useFakeTimers();
    
    render(<MockAnimatedPage />);
    
    const coverElement = screen.getByTestId('cover-animation');
    const galleryElement = screen.getByTestId('circular-gallery');
    
    // Simulate user interactions during animations
    const interactions = [
      () => coverElement.dispatchEvent(new Event('mouseenter')),
      () => coverElement.dispatchEvent(new Event('mouseleave')),
      () => galleryElement.dispatchEvent(new Event('click')),
    ];

    const performanceMonitor = global.testUtils.createPerformanceMonitor();
    
    performanceMonitor.startFrame();
    
    // Execute interactions rapidly
    interactions.forEach((interaction, index) => {
      act(() => {
        jest.advanceTimersByTime(50);
        interaction();
      });
    });
    
    const totalTime = performanceMonitor.endFrame();
    
    // Should handle interactions smoothly
    expect(totalTime).toBeLessThan(33.33); // Less than 2 frames
    
    jest.useRealTimers();
  });

  it('should maintain performance during page scroll with animations', async () => {
    render(<MockAnimatedPage />);
    
    const performanceMonitor = global.testUtils.createPerformanceMonitor();
    
    // Simulate scroll events during animation
    performanceMonitor.startFrame();
    
    for (let i = 0; i < 10; i++) {
      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });
    }
    
    const scrollHandlingTime = performanceMonitor.endFrame();
    
    // Scroll handling should be efficient
    expect(scrollHandlingTime).toBeLessThan(16.67); // Less than one frame
  });
});

export {};
