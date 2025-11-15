import React from 'react';

interface State {
  hasError: boolean;
  error?: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-red-400">Something went wrong</h3>
          <p className="text-sm text-text-secondary mt-2">{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <div className="mt-4">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-cyan text-black rounded-md"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
