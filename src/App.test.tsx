import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
