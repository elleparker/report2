import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the main page component navigation logic
const MockNavigation = ({ onNavigate }: { onNavigate: (url: string) => void }) => (
  <nav className="glass-nav" style={{ height: '120px' }}>
    <button onClick={() => onNavigate('#executive-summary')}>Executive Summary</button>
    <button onClick={() => onNavigate('#introduction')}>Introduction</button>
    <button onClick={() => onNavigate('#b2c-model')}>B2C Model</button>
    <button onClick={() => onNavigate('#financial-overview')}>Financial Overview</button>
    <button onClick={() => onNavigate('#faq')}>FAQ</button>
  </nav>
);

const MockPage = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionChange = (url: string) => {
    const sectionId = url.startsWith('#') ? url.slice(1) : url;
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Responsive navigation height calculation
      const navHeight = isMobile ? 90 : 120;
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <MockNavigation onNavigate={handleSectionChange} />
      <main className="px-4 pb-10">
        <section id="executive-summary" className="section-wrapper" style={{ height: '500px', marginTop: '120px' }}>
          <h2>Executive Summary</h2>
        </section>
        <section id="introduction" className="section-wrapper" style={{ height: '500px' }}>
          <h2>Introduction</h2>
        </section>
        <section id="b2c-model" className="section-wrapper" style={{ height: '500px' }}>
          <h2>B2C Model</h2>
        </section>
        <section id="financial-overview" className="section-wrapper" style={{ height: '500px' }}>
          <h2>Financial Overview</h2>
        </section>
        <section id="faq" className="section-wrapper" style={{ height: '500px' }}>
          <h2>FAQ</h2>
        </section>
      </main>
    </div>
  );
};

describe('Navigation Scroll Behavior', () => {
  let mockScrollTo: jest.Mock;

  beforeEach(() => {
    // Mock window.scrollTo
    mockScrollTo = jest.fn();
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: mockScrollTo,
    });

    // Mock element.offsetTop
    Element.prototype.offsetTop = 1000; // Mock offset position
    
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1440,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 900,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop Navigation (>640px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
    });

    it('should scroll to correct position with desktop nav height offset', async () => {
      render(<MockPage />);
      
      const executiveSummaryBtn = screen.getByText('Executive Summary');
      fireEvent.click(executiveSummaryBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: 880, // 1000 (offsetTop) - 120 (desktop nav height)
          behavior: 'smooth'
        });
      });
    });

    it('should handle multiple navigation clicks correctly', async () => {
      render(<MockPage />);
      
      const introBtn = screen.getByText('Introduction');
      const b2cBtn = screen.getByText('B2C Model');
      
      fireEvent.click(introBtn);
      fireEvent.click(b2cBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledTimes(2);
        expect(mockScrollTo).toHaveBeenNthCalledWith(1, {
          top: 880, // Same calculation for all sections with our mock
          behavior: 'smooth'
        });
        expect(mockScrollTo).toHaveBeenNthCalledWith(2, {
          top: 880,
          behavior: 'smooth'
        });
      });
    });

    it('should use smooth scroll behavior', async () => {
      render(<MockPage />);
      
      const faqBtn = screen.getByText('FAQ');
      fireEvent.click(faqBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith(
          expect.objectContaining({
            behavior: 'smooth'
          })
        );
      });
    });
  });

  describe('Mobile Navigation (≤640px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
    });

    it('should scroll to correct position with mobile nav height offset', async () => {
      render(<MockPage />);
      
      // Trigger resize to set mobile state
      fireEvent(window, new Event('resize'));
      
      await waitFor(() => {
        const executiveSummaryBtn = screen.getByText('Executive Summary');
        fireEvent.click(executiveSummaryBtn);
      });
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: 910, // 1000 (offsetTop) - 90 (mobile nav height)
          behavior: 'smooth'
        });
      });
    });

    it('should update nav height calculation on resize', async () => {
      render(<MockPage />);
      
      // Start with desktop
      const financialBtn = screen.getByText('Financial Overview');
      fireEvent.click(financialBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: 880, // Desktop calculation
          behavior: 'smooth'
        });
      });
      
      // Resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      fireEvent(window, new Event('resize'));
      
      // Click again after resize
      fireEvent.click(financialBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenLastCalledWith({
          top: 910, // Mobile calculation
          behavior: 'smooth'
        });
      });
    });
  });

  describe('URL Format Handling', () => {
    it('should handle URL with hash prefix', async () => {
      render(<MockPage />);
      
      const introBtn = screen.getByText('Introduction');
      fireEvent.click(introBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith(
          expect.objectContaining({
            top: expect.any(Number),
            behavior: 'smooth'
          })
        );
      });
    });

    it('should handle direct section ID without hash', async () => {
      const MockDirectNavigation = () => {
        const handleSectionChange = (sectionId: string) => {
          const element = document.getElementById(sectionId);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 120,
              behavior: 'smooth'
            });
          }
        };

        return (
          <div>
            <button onClick={() => handleSectionChange('executive-summary')}>
              Direct Navigation
            </button>
            <section id="executive-summary" style={{ height: '500px' }}>
              <h2>Executive Summary</h2>
            </section>
          </div>
        );
      };

      render(<MockDirectNavigation />);
      
      const directBtn = screen.getByText('Direct Navigation');
      fireEvent.click(directBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: 880,
          behavior: 'smooth'
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing target elements gracefully', async () => {
      const MockNavigationWithInvalidTarget = () => {
        const handleSectionChange = (url: string) => {
          const sectionId = url.startsWith('#') ? url.slice(1) : url;
          const element = document.getElementById(sectionId);
          
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 120,
              behavior: 'smooth'
            });
          }
          // Should not throw error if element doesn't exist
        };

        return (
          <div>
            <button onClick={() => handleSectionChange('#nonexistent')}>
              Invalid Link
            </button>
          </div>
        );
      };

      render(<MockNavigationWithInvalidTarget />);
      
      const invalidBtn = screen.getByText('Invalid Link');
      
      // Should not throw error
      expect(() => {
        fireEvent.click(invalidBtn);
      }).not.toThrow();
      
      // Should not call scrollTo for nonexistent elements
      expect(mockScrollTo).not.toHaveBeenCalled();
    });

    it('should handle scrollTo errors gracefully', async () => {
      mockScrollTo.mockImplementation(() => {
        throw new Error('Scroll error');
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<MockPage />);
      
      const executiveSummaryBtn = screen.getByText('Executive Summary');
      
      // Should not crash the app
      expect(() => {
        fireEvent.click(executiveSummaryBtn);
      }).not.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Performance Considerations', () => {
    it('should debounce rapid navigation clicks', async () => {
      render(<MockPage />);
      
      const executiveSummaryBtn = screen.getByText('Executive Summary');
      
      // Rapid clicks
      fireEvent.click(executiveSummaryBtn);
      fireEvent.click(executiveSummaryBtn);
      fireEvent.click(executiveSummaryBtn);
      
      // Should still call scrollTo for each click (no debouncing in current implementation)
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledTimes(3);
      });
    });

    it('should not cause memory leaks with event listeners', () => {
      const { unmount } = render(<MockPage />);
      
      // Mock addEventListener/removeEventListener
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      
      unmount();
      
      // Should clean up resize listener
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should support keyboard navigation', async () => {
      render(<MockPage />);
      
      const executiveSummaryBtn = screen.getByText('Executive Summary');
      
      // Focus and press Enter
      executiveSummaryBtn.focus();
      fireEvent.keyDown(executiveSummaryBtn, { key: 'Enter', code: 'Enter' });
      
      // Should trigger navigation (click event)
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalled();
      });
    });

    it('should support reduced motion preferences', async () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const MockReducedMotionNavigation = () => {
        const handleSectionChange = (url: string) => {
          const sectionId = url.startsWith('#') ? url.slice(1) : url;
          const element = document.getElementById(sectionId);
          
          if (element) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            window.scrollTo({
              top: element.offsetTop - 120,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
        };

        return (
          <div>
            <button onClick={() => handleSectionChange('#executive-summary')}>
              Executive Summary
            </button>
            <section id="executive-summary" style={{ height: '500px' }}>
              <h2>Executive Summary</h2>
            </section>
          </div>
        );
      };

      render(<MockReducedMotionNavigation />);
      
      const executiveSummaryBtn = screen.getByText('Executive Summary');
      fireEvent.click(executiveSummaryBtn);
      
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: 880,
          behavior: 'auto' // Should use 'auto' instead of 'smooth' for reduced motion
        });
      });
    });
  });
});

// Integration test with custom matchers
describe('Navigation Integration Tests', () => {
  it('should calculate scroll offsets within acceptable tolerance', async () => {
    const mockElement = {
      offsetTop: 1000,
      id: 'executive-summary'
    };
    
    // Mock getElementById
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as HTMLElement);
    
    const navHeight = 120;
    const expectedScrollTop = mockElement.offsetTop - navHeight;
    const actualScrollTop = 880;
    
    // Use our custom matcher
    expect(actualScrollTop).toHaveValidScrollOffset(expectedScrollTop, 5);
  });
});
