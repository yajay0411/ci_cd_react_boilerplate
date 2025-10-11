import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

// Create a test-utils file like this to help with testing
// This creates a custom render function that includes providers
// For more information, see:
// https://testing-library.com/docs/react-testing-library/setup#custom-render

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from @testing-library/react
// This allows you to import { render, screen } from '../../test-utils'
// instead of importing from @testing-library/react
export * from '@testing-library/react';
// Override the render method with our custom render function
export { customRender as render };
