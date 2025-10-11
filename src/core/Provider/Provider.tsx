import React, { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/core/ErrorBoundary/ErrorBoundary';

interface IProviderProps {
  children: ReactNode;
}

const Provider: React.FC<IProviderProps> = ({ children }) => {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>{children}</BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default Provider;
