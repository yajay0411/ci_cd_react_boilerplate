import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error?: unknown };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: unknown, info: unknown) {
    // Hook for logging (e.g., Sentry.captureException(error))
    // eslint-disable-next-line no-console
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? <div>Something went wrong.</div>;
    return this.props.children;
  }
}
