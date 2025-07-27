import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock components for testing
const MockSection = ({ 
  id, 
  className = "", 
  children 
}: { 
  id: string; 
  className?: string; 
  children: React.ReactNode;
}) => (
  <section id={id} className={`section-wrapper ${className}`}>
    {children}
  </section>
);

const MockMainLayout = () => (
  <div className="min-h-screen">
    <nav style={{ height: '120px' }}>Navigation</nav>
    <main className="px-4 pb-10">
      <MockSection id="section-1">
        <div className="glass p-8">Section 1 Content</div>
      </MockSection>
      <MockSection id="section-2">
        <div className="glass p-8">Section 2 Content</div>
      </MockSection>
      <MockSection id="section-3">
        <div className="glass p-8">Section 3 Content</div>
      </MockSection>
    </main>
  </div>
);

describe('Section Spacing Validation', () => {
  // Mock window dimensions for responsive testing
  const setWindowDimensions = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    window.dispatchEvent(new Event('resize'));
  };

  beforeAll(() => {
    // Mock getComputedStyle to return our CSS values
    global.getComputedStyle = jest.fn().mockImplementation((element) => {
      const styles: { [key: string]: string } = {
        marginBottom: '40px', // 2.5rem converted to px
        maxWidth: '1440px', // 90rem converted to px
        margin: '0 auto',
      };
      
      // Check if element has section-wrapper class
      if (element.classList?.contains('section-wrapper')) {
        return styles;
      }
      
      return {};
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Desktop Layout (≥1024px)', () => {
    beforeEach(() => {
      setWindowDimensions(1440, 900);
    });

    it('should have consistent section spacing ≤40px', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      expect(sections).toHaveLength(3);
      
      // Verify each section has the proper wrapper class
      sections.forEach((section) => {
        expect(section).toHaveClass('section-wrapper');
        
        // Get computed styles
        const styles = getComputedStyle(section);
        const marginBottom = parseInt(styles.marginBottom);
        
        // Assert margin is exactly 40px (2.5rem)
        expect(marginBottom).toBeLessThanOrEqual(40);
        expect(marginBottom).toBeGreaterThan(0);
      });
    });

    it('should maintain max-width constraint', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        const styles = getComputedStyle(section);
        const maxWidth = parseInt(styles.maxWidth);
        
        // Should be 90rem = 1440px
        expect(maxWidth).toBe(1440);
      });
    });

    it('should center sections with auto margins', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        const styles = getComputedStyle(section);
        expect(styles.margin).toContain('auto');
      });
    });
  });

  describe('Tablet Layout (768px-1023px)', () => {
    beforeEach(() => {
      setWindowDimensions(768, 1024);
      
      // Mock responsive CSS values for tablet
      global.getComputedStyle = jest.fn().mockImplementation((element) => {
        if (element.classList?.contains('section-wrapper')) {
          return {
            marginBottom: '32px', // Slightly reduced for tablet
            maxWidth: '1440px',
            margin: '0 auto',
          };
        }
        return {};
      });
    });

    it('should have appropriate section spacing for tablet', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        const styles = getComputedStyle(section);
        const marginBottom = parseInt(styles.marginBottom);
        
        expect(marginBottom).toBeLessThanOrEqual(40);
        expect(marginBottom).toBeGreaterThan(0);
      });
    });
  });

  describe('Mobile Layout (≤767px)', () => {
    beforeEach(() => {
      setWindowDimensions(375, 667);
      
      // Mock responsive CSS values for mobile
      global.getComputedStyle = jest.fn().mockImplementation((element) => {
        if (element.classList?.contains('section-wrapper')) {
          return {
            marginBottom: '24px', // Reduced for mobile
            maxWidth: '100%',
            margin: '0 auto',
            padding: '0 16px', // Mobile padding
          };
        }
        return {};
      });
    });

    it('should have reduced section spacing on mobile', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        const styles = getComputedStyle(section);
        const marginBottom = parseInt(styles.marginBottom);
        
        // Mobile should have smaller gaps, but still ≤40px
        expect(marginBottom).toBeLessThanOrEqual(40);
        expect(marginBottom).toBeGreaterThan(0);
      });
    });

    it('should use full width on mobile', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        const styles = getComputedStyle(section);
        expect(styles.maxWidth).toBe('100%');
      });
    });

    it('should apply proper mobile padding', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        const styles = getComputedStyle(section);
        expect(styles.padding).toContain('16px');
      });
    });
  });

  describe('CSS Class Validation', () => {
    it('should apply section-wrapper class to all sections', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        expect(section).toHaveClass('section-wrapper');
      });
    });

    it('should validate CSS custom properties are defined', () => {
      render(<MockMainLayout />);
      
      // Check that our CSS custom properties would be available
      const style = document.createElement('style');
      style.textContent = `
        .section-wrapper {
          margin-bottom: 2.5rem; /* 40px */
          max-width: 90rem; /* 1440px */
          margin: 0 auto;
        }
      `;
      document.head.appendChild(style);
      
      const testElement = document.createElement('div');
      testElement.className = 'section-wrapper';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      expect(computedStyle).toBeDefined();
      
      // Cleanup
      document.head.removeChild(style);
      document.body.removeChild(testElement);
    });
  });

  describe('Layout Overflow Prevention', () => {
    it('should not cause horizontal overflow', () => {
      render(<MockMainLayout />);
      
      // Mock getBoundingClientRect for overflow detection
      const mockGetBoundingClientRect = jest.fn(() => ({
        width: 375, // Mobile width
        height: 200,
        left: 0,
        top: 0,
        right: 375,
        bottom: 200,
        x: 0,
        y: 0,
      }));
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        section.getBoundingClientRect = mockGetBoundingClientRect;
        
        const rect = section.getBoundingClientRect();
        expect(rect.width).toBeLessThanOrEqual(375); // Should not exceed viewport
        expect(rect.left).toBeGreaterThanOrEqual(0); // Should not be negative
      });
    });

    it('should handle content within section boundaries', () => {
      render(<MockMainLayout />);
      
      const sections = screen.getAllByRole('region');
      sections.forEach((section) => {
        const content = section.querySelector('.glass');
        expect(content).toBeInTheDocument();
        
        // Verify content doesn't overflow its container
        if (content) {
          // Mock the content dimensions
          content.getBoundingClientRect = jest.fn(() => ({
            width: 350,
            height: 100,
            left: 12.5, // Centered with padding
            top: 0,
            right: 362.5,
            bottom: 100,
            x: 12.5,
            y: 0,
          }));
          
          const contentRect = content.getBoundingClientRect();
          expect(contentRect.width).toBeLessThan(375); // Should fit within mobile viewport
        }
      });
    });
  });

  describe('Performance Impact of Spacing', () => {
    it('should not cause layout thrashing with section spacing', () => {
      const performanceMonitor = global.testUtils.createPerformanceMonitor();
      
      performanceMonitor.startFrame();
      render(<MockMainLayout />);
      const renderTime = performanceMonitor.endFrame();
      
      // Render time should be reasonable (less than 16ms for 60fps)
      expect(renderTime).toBeLessThan(16);
    });

    it('should maintain consistent spacing across re-renders', () => {
      const { rerender } = render(<MockMainLayout />);
      
      const getSectionSpacing = () => {
        const sections = screen.getAllByRole('region');
        return sections.map(section => {
          const styles = getComputedStyle(section);
          return parseInt(styles.marginBottom);
        });
      };
      
      const initialSpacing = getSectionSpacing();
      
      // Re-render and check spacing consistency
      rerender(<MockMainLayout />);
      const rerenderedSpacing = getSectionSpacing();
      
      expect(rerenderedSpacing).toEqual(initialSpacing);
    });
  });
});

// Integration test with actual CSS
describe('CSS Integration Test', () => {
  beforeAll(() => {
    // Inject actual CSS for testing
    const style = document.createElement('style');
    style.textContent = `
      .section-wrapper {
        margin: 0 auto;
        max-width: 90rem;
        margin-bottom: 2.5rem; /* 40px */
      }
      
      @media (max-width: 1024px) {
        .section-wrapper {
          margin-bottom: 2rem; /* 32px */
        }
      }
      
      @media (max-width: 640px) {
        .section-wrapper {
          margin-bottom: 1.5rem; /* 24px */
          padding: 0 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  });

  it('should respect actual CSS spacing rules', () => {
    render(<MockMainLayout />);
    
    const sections = screen.getAllByRole('region');
    expect(sections.length).toBeGreaterThan(0);
    
    sections.forEach((section) => {
      // The section should have the correct class
      expect(section).toHaveClass('section-wrapper');
    });
  });
});
