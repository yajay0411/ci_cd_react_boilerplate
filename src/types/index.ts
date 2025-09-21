import type { ReactNode } from 'react';

// Common React component props
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

export type CSSSize = string | number;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
