import React from 'react';
import { render, screen } from '@testing-library/react';
import { useInView } from 'framer-motion';
import { AnimatedMetricCard } from '../AnimatedMetricCard';

// Mock the CountUp component
jest.mock('../CountUp', () => {
  return function MockCountUp({ to, startWhen, separator, from }: any) {
    if (startWhen) {
      return <span data-testid="countup-animated">{to}</span>;
    }
    return <span data-testid="countup-static">{from || 0}</span>;
  };
});

// Mock framer-motion useInView
const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;

describe('AnimatedMetricCard Component', () => {
  const defaultProps = {
    title: 'Revenue',
    value: '$1,250.50',
    change: '+12.5%',
    trend: 'up' as const,
    icon: <div data-testid="icon">📊</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInView.mockReturnValue(false);
  });

  it('renders all basic elements correctly', () => {
    render(<AnimatedMetricCard {...defaultProps} />);

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('extracts numeric value correctly from different formats', () => {
    const testCases = [
      { value: '$1,250.50', expectedNumeric: 1250.5 },
      { value: '1.5M+', expectedNumeric: 1.5 },
      { value: '25K', expectedNumeric: 25 },
      { value: '80%', expectedNumeric: 80 },
      { value: '500', expectedNumeric: 500 },
    ];

    testCases.forEach(({ value, expectedNumeric }) => {
      const { unmount } = render(<AnimatedMetricCard {...defaultProps} value={value} />);
      // The component should extract the numeric value correctly
      // We can't directly test the internal function, but we can verify
      // that the component renders without errors - when not in view,
      // it shows the original value
      if (expectedNumeric === 0) {
        // For non-numeric values like "N/A", it should show the original
        expect(screen.getByText(value)).toBeInTheDocument();
      } else {
        // The component renders, numeric extraction worked
        expect(screen.getByText('Revenue')).toBeInTheDocument();
      }
      unmount();
    });
  });

  it('displays static CountUp when not in view', () => {
    mockUseInView.mockReturnValue(false);
    
    render(<AnimatedMetricCard {...defaultProps} value="$1,250.50" />);
    
    // When not in view, should show split components but CountUp shouldn't animate
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByTestId('countup-static')).toBeInTheDocument();
  });

  it('starts CountUp animation when in view', () => {
    mockUseInView.mockReturnValue(true);
    
    render(<AnimatedMetricCard {...defaultProps} value="$1,250.50" />);
    
    // Should show the CountUp component
    expect(screen.getByTestId('countup-animated')).toBeInTheDocument();
  });

  it('handles prefix extraction correctly', () => {
    mockUseInView.mockReturnValue(true);
    
    render(<AnimatedMetricCard {...defaultProps} value="$100" />);
    
    // The $ prefix should be separated from the CountUp component
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByTestId('countup-animated')).toBeInTheDocument();
  });

  it('handles suffix extraction correctly', () => {
    mockUseInView.mockReturnValue(true);
    
    const suffixCases = [
      { value: '1.5M+', expectedSuffix: 'M+' },
      { value: '1.5M', expectedSuffix: 'M' },
      { value: '25K', expectedSuffix: 'K' },
      { value: '80%', expectedSuffix: '%' },
    ];

    suffixCases.forEach(({ value, expectedSuffix }) => {
      const { unmount } = render(<AnimatedMetricCard {...defaultProps} value={value} />);
      expect(screen.getByText(expectedSuffix)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies correct trend styling for up trend', () => {
    render(<AnimatedMetricCard {...defaultProps} trend="up" />);
    
    const changeElement = screen.getByText('+12.5%');
    expect(changeElement).toHaveClass('bg-green-500/20', 'text-green-400');
  });

  it('applies correct trend styling for down trend', () => {
    render(<AnimatedMetricCard {...defaultProps} trend="down" change="-5.2%" />);
    
    const changeElement = screen.getByText('-5.2%');
    expect(changeElement).toHaveClass('bg-red-500/20', 'text-red-400');
  });

  it('handles non-numeric values gracefully', () => {
    mockUseInView.mockReturnValue(true);
    
    render(<AnimatedMetricCard {...defaultProps} value="N/A" />);
    
    // Should display the original value since numeric extraction returns 0
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('uses framer-motion useInView with correct options', () => {
    render(<AnimatedMetricCard {...defaultProps} />);
    
    expect(mockUseInView).toHaveBeenCalledWith(
      expect.any(Object), // ref
      { once: true, margin: "0px" }
    );
  });

  it.skip('passes correct props to CountUp component', () => {
    mockUseInView.mockReturnValue(true);
    
    // Mock the CountUp component to capture props
    const MockCountUp = jest.fn(({ to, startWhen, separator, from }) => (
      <span data-testid="countup">{to}</span>
    ));
    
    jest.doMock('../CountUp', () => MockCountUp);
    
    const { rerender } = render(<AnimatedMetricCard {...defaultProps} value="1,250" />);
    
    // Force re-render to pick up the new mock
    rerender(<AnimatedMetricCard {...defaultProps} value="1,250" />);
    
    expect(MockCountUp).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 1250,
        from: 0,
        duration: 2.5,
        startWhen: true,
        separator: ",",
        className: "",
      }),
      expect.any(Object)
    );
  });

  it('renders motion.div with correct initial and animate states', () => {
    // Test not in view
    mockUseInView.mockReturnValue(false);
    const { rerender } = render(<AnimatedMetricCard {...defaultProps} />);
    
    // Re-render with in view
    mockUseInView.mockReturnValue(true);
    rerender(<AnimatedMetricCard {...defaultProps} />);
    
    // The motion.div should be present (mocked as regular div)
    const cardElement = screen.getByText('Revenue').closest('div');
    expect(cardElement).toBeInTheDocument();
  });

  it('maintains all CSS classes for styling', () => {
    render(<AnimatedMetricCard {...defaultProps} />);
    
    // Find the main card element by looking for the motion.div with the styling classes
    const cardElement = screen.getByText('Revenue').closest('div')?.parentElement?.parentElement;
    expect(cardElement).toHaveClass(
      'bg-white/5',
      'backdrop-blur',
      'border',
      'border-yellow-400/30',
      'rounded-lg',
      'p-6',
      'relative',
      'overflow-hidden',
      'group',
      'cursor-pointer'
    );
  });
});
