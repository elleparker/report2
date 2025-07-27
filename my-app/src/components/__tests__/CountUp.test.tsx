import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import CountUp from '../CountUp';

// Mock framer-motion hooks
const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;
const mockUseMotionValue = useMotionValue as jest.MockedFunction<typeof useMotionValue>;
const mockUseSpring = useSpring as jest.MockedFunction<typeof useSpring>;

describe('CountUp Component', () => {
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

  it('renders initial value correctly', () => {
    render(<CountUp from={0} to={100} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('starts animation when in view (default behavior)', async () => {
    // First render with not in view
    const { rerender } = render(<CountUp from={0} to={100} />);
    expect(mockSet).not.toHaveBeenCalled();

    // Then simulate coming into view
    mockUseInView.mockReturnValue(true);
    rerender(<CountUp from={0} to={100} />);
    
    await waitFor(() => {
      expect(mockSet).toHaveBeenCalledWith(100);
    });
  });

  it('starts animation when startWhen prop is true', async () => {
    render(<CountUp from={0} to={100} startWhen={true} />);
    
    await waitFor(() => {
      expect(mockSet).toHaveBeenCalledWith(100);
    });
  });

  it('does not start animation when startWhen prop is false', async () => {
    render(<CountUp from={0} to={100} startWhen={false} />);
    
    // Wait a bit to ensure no animation started
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(mockSet).not.toHaveBeenCalled();
  });

  it('respects delay prop', async () => {
    jest.useFakeTimers();
    
    render(<CountUp from={0} to={100} startWhen={true} delay={1} />);
    
    // Should not have called set immediately
    expect(mockSet).not.toHaveBeenCalled();
    
    // Fast forward time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    await waitFor(() => {
      expect(mockSet).toHaveBeenCalledWith(100);
    });
    
    jest.useRealTimers();
  });

  it('formats numbers with separator', () => {
    render(<CountUp from={0} to={1000} separator="," />);
    
    // Simulate the spring animation callback
    act(() => {
      mockOnChange(1000);
    });
    
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('handles decimal numbers correctly', () => {
    render(<CountUp from={0} to={123.45} />);
    
    // Simulate the spring animation callback
    act(() => {
      mockOnChange(123.45);
    });
    
    expect(screen.getByText('123.45')).toBeInTheDocument();
  });

  it('handles down direction correctly', async () => {
    render(<CountUp from={100} to={0} direction="down" startWhen={true} />);
    
    // Initial value should be the "to" value for down direction
    expect(screen.getByText('0')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockSet).toHaveBeenCalledWith(100);
    });
  });

  it('applies custom className', () => {
    render(<CountUp from={0} to={100} className="custom-class" />);
    
    const element = screen.getByText('0');
    expect(element).toHaveClass('custom-class');
  });

  it('calls useInView with correct options', () => {
    render(<CountUp from={0} to={100} />);
    
    expect(mockUseInView).toHaveBeenCalledWith(
      expect.any(Object), // ref
      { once: true, margin: "0px" }
    );
  });

  it('prefers startWhen over inView when both are provided', async () => {
    mockUseInView.mockReturnValue(true);
    
    // Should not start because startWhen is false
    render(<CountUp from={0} to={100} startWhen={false} />);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(mockSet).not.toHaveBeenCalled();
  });

  it('updates display when spring value changes', () => {
    render(<CountUp from={0} to={100} />);
    
    // Simulate spring animation updating
    act(() => {
      mockOnChange(50);
    });
    
    expect(screen.getByText('50')).toBeInTheDocument();
    
    act(() => {
      mockOnChange(75);
    });
    
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('cleans up timeout on unmount', () => {
    jest.useFakeTimers();
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(<CountUp from={0} to={100} startWhen={true} delay={1} />);
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    jest.useRealTimers();
    clearTimeoutSpy.mockRestore();
  });
});
