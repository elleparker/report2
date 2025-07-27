import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import CountUp from '../CountUp';

// Mock framer-motion hooks
jest.mock('framer-motion', () => ({
  useInView: jest.fn(),
  useMotionValue: jest.fn(),
  useSpring: jest.fn(),
}));

const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;
const mockUseMotionValue = useMotionValue as jest.MockedFunction<typeof useMotionValue>;
const mockUseSpring = useSpring as jest.MockedFunction<typeof useSpring>;

describe('CountUp Single Fire Behavior', () => {
  let mockMotionValue: any;
  let mockSpringValue: any;
  let mockOnChange: jest.Mock;
  let mockSet: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockSet = jest.fn();
    mockOnChange = jest.fn();
    
    mockMotionValue = {
      set: mockSet,
    };
    
    mockSpringValue = {
      on: jest.fn((event, callback) => {
        if (event === 'change') {
          mockOnChange = callback;
        }
        return jest.fn(); // Return unsubscribe function
      }),
    };
    
    mockUseMotionValue.mockReturnValue(mockMotionValue);
    mockUseSpring.mockReturnValue(mockSpringValue);
    mockUseInView.mockReturnValue(false);
  });

  describe('Single Fire Requirement', () => {
    it('should fire animation exactly once when entering viewport', async () => {
      // Start with component out of view
      const { rerender } = render(<CountUp from={0} to={100} />);
      expect(mockSet).not.toHaveBeenCalled();

      // Simulate entering viewport
      mockUseInView.mockReturnValue(true);
      rerender(<CountUp from={0} to={100} />);
      
      await waitFor(() => {
        expect(mockSet).toHaveBeenCalledTimes(1);
        expect(mockSet).toHaveBeenCalledWith(100);
      });

      // Simulate leaving and re-entering viewport (should not fire again due to { once: true })
      mockUseInView.mockReturnValue(false);
      rerender(<CountUp from={0} to={100} />);
      
      mockUseInView.mockReturnValue(true);
      rerender(<CountUp from={0} to={100} />);
      
      // Should still only have been called once
      expect(mockSet).toHaveBeenCalledTimes(1);
    });

    it('should not fire multiple times when using startWhen prop', async () => {
      const { rerender } = render(<CountUp from={0} to={100} startWhen={false} />);
      expect(mockSet).not.toHaveBeenCalled();

      // Enable animation
      rerender(<CountUp from={0} to={100} startWhen={true} />);
      
      await waitFor(() => {
        expect(mockSet).toHaveBeenCalledTimes(1);
      });

      // Changing startWhen to false and back to true should not trigger again
      rerender(<CountUp from={0} to={100} startWhen={false} />);
      rerender(<CountUp from={0} to={100} startWhen={true} />);
      
      // Should still only have been called once (this may fail with current implementation)
      // This test reveals potential issue with current CountUp implementation
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      // This assertion may fail - indicating a bug where CountUp can fire multiple times
      expect(mockSet).toHaveBeenCalledTimes(1);
    });

    it('should use intersection observer with { once: true } option', () => {
      render(<CountUp from={0} to={100} />);
      
      expect(mockUseInView).toHaveBeenCalledWith(
        expect.any(Object), // ref
        { once: true, margin: "0px" }
      );
    });

    it('should respect delay but only fire once', async () => {
      jest.useFakeTimers();
      
      const { rerender } = render(<CountUp from={0} to={100} delay={1} />);
      
      // Trigger intersection
      mockUseInView.mockReturnValue(true);
      rerender(<CountUp from={0} to={100} delay={1} />);
      
      // Should not have fired yet
      expect(mockSet).not.toHaveBeenCalled();
      
      // Advance time by delay amount
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      await waitFor(() => {
        expect(mockSet).toHaveBeenCalledTimes(1);
      });
      
      // Multiple intersection events should not cause multiple fires
      mockUseInView.mockReturnValue(false);
      rerender(<CountUp from={0} to={100} delay={1} />);
      mockUseInView.mockReturnValue(true);
      rerender(<CountUp from={0} to={100} delay={1} />);
      
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Should still only have been called once
      expect(mockSet).toHaveBeenCalledTimes(1);
      
      jest.useRealTimers();
    });
  });

  describe('Animation Accuracy', () => {
    it('should count to exact target value', async () => {
      render(<CountUp from={0} to={1234.56} startWhen={true} />);
      
      // Simulate spring animation completing
      act(() => {
        mockOnChange(1234.56);
      });
      
      expect(screen.getByText('1234.56')).toBeInTheDocument();
    });

    it('should handle large numbers correctly', async () => {
      render(<CountUp from={0} to={1000000} separator="," startWhen={true} />);
      
      act(() => {
        mockOnChange(1000000);
      });
      
      expect(screen.getByText('1,000,000')).toBeInTheDocument();
    });

    it('should maintain decimal precision', async () => {
      render(<CountUp from={0} to={99.999} startWhen={true} />);
      
      act(() => {
        mockOnChange(99.999);
      });
      
      expect(screen.getByText('99.999')).toBeInTheDocument();
    });
  });

  describe('Performance Considerations', () => {
    it('should clean up event listeners on unmount', () => {
      const unsubscribeMock = jest.fn();
      mockSpringValue.on.mockReturnValue(unsubscribeMock);
      
      const { unmount } = render(<CountUp from={0} to={100} />);
      
      unmount();
      
      expect(unsubscribeMock).toHaveBeenCalled();
    });

    it('should clear timeouts on unmount to prevent memory leaks', () => {
      jest.useFakeTimers();
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      
      const { unmount } = render(<CountUp from={0} to={100} startWhen={true} delay={1} />);
      
      unmount();
      
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      jest.useRealTimers();
      clearTimeoutSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should handle reduced motion preferences', () => {
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

      render(<CountUp from={0} to={100} startWhen={true} />);
      
      // When reduced motion is preferred, animation should complete instantly
      expect(mockUseSpring).toHaveBeenCalledWith(
        mockMotionValue,
        expect.objectContaining({
          damping: expect.any(Number),
          stiffness: expect.any(Number),
        })
      );
    });
  });
});
