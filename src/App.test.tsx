import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Mock WebGL components which throw errors in JSDOM due to missing WebGL implementation
vi.mock('./components/ThreeBackground', () => ({
  default: () => <div data-testid="mock-three-background" />,
}));

vi.mock('./components/FloatingThreeDObject', () => ({
  default: () => <div data-testid="mock-floating-object" />,
}));

vi.mock('./components/ThreePhotoCube', () => ({
  default: () => <div data-testid="mock-photo-cube" />,
}));

vi.mock('./components/InterlockedRings', () => ({
  default: () => <div data-testid="mock-interlocked-rings" />,
}));

describe('App', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders without crashing', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(container).toBeDefined();
  });
});
