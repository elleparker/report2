import '@testing-library/jest-dom';
import 'intersection-observer';

// Mock framer-motion at the global level
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    useInView: jest.fn(() => false),
    useMotionValue: jest.fn(() => ({
      set: jest.fn(),
    })),
    useSpring: jest.fn(() => ({
      on: jest.fn(() => jest.fn()),
    })),
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('div', props, children);
      },
      section: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('section', props, children);
      },
      span: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('span', props, children);
      },
      h1: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('h1', props, children);
      },
      h2: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('h2', props, children);
      },
      h3: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('h3', props, children);
      },
      rect: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('rect', props, children);
      },
      svg: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('svg', props, children);
      },
      path: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('path', props, children);
      },
      linearGradient: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('linearGradient', props, children);
      },
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock motion/react for newer motion library
jest.mock('motion/react', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('div', props, children);
      },
      span: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('span', props, children);
      },
      svg: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('svg', props, children);
      },
      path: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('path', props, children);
      },
      linearGradient: ({ children, ...props }: any) => {
        const React = require('react');
        return React.createElement('linearGradient', props, children);
      },
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver if not already available
if (!global.IntersectionObserver) {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
}

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo for navigation tests
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));

// Mock performance API for FPS testing
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
  },
});

// Set up console error/warning handling for tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: Each child in a list should have a unique') ||
       args[0].includes('Warning: Failed prop type'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('componentWillReceiveProps has been renamed')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Global test utilities
global.testUtils = {
  // Simulate viewport intersection
  mockIntersection: (isIntersecting: boolean) => {
    const mockUseInView = require('framer-motion').useInView as jest.MockedFunction<any>;
    mockUseInView.mockReturnValue(isIntersecting);
  },
  // Simulate reduced motion preference
  mockReducedMotion: (reduced: boolean) => {
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? reduced : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  },
  // Create performance monitor for FPS testing
  createPerformanceMonitor: () => {
    const frames: number[] = [];
    const monitor = {
      startFrame: () => frames.push(performance.now()),
      endFrame: () => {
        const now = performance.now();
        const lastFrame = frames[frames.length - 1];
        return now - lastFrame;
      },
      getFPS: () => {
        if (frames.length < 2) return 0;
        const totalTime = frames[frames.length - 1] - frames[0];
        return Math.round((frames.length - 1) / (totalTime / 1000));
      },
      reset: () => frames.length = 0,
    };
    return monitor;
  },
};

// Extend expect with custom matchers for better testing
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinFPSRange(min: number, max: number): R;
      toHaveValidScrollOffset(expectedOffset: number, tolerance?: number): R;
    }
  }
  
  var testUtils: {
    mockIntersection: (isIntersecting: boolean) => void;
    mockReducedMotion: (reduced: boolean) => void;
    createPerformanceMonitor: () => {
      startFrame: () => void;
      endFrame: () => number;
      getFPS: () => number;
      reset: () => void;
    };
  };
}

expect.extend({
  toBeWithinFPSRange(received: number, min: number, max: number) {
    const pass = received >= min && received <= max;
    return {
      message: () =>
        `expected ${received} FPS to be within range ${min}-${max}`,
      pass,
    };
  },
  
  toHaveValidScrollOffset(received: number, expected: number, tolerance: number = 5) {
    const pass = Math.abs(received - expected) <= tolerance;
    return {
      message: () =>
        `expected scroll offset ${received} to be within ${tolerance}px of ${expected}`,
      pass,
    };
  },
});
