import { Alert, AlertTitle } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by error boundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Oops, something went wrong while displaying this section !
            <strong>
              Please try again later or contact support if the problem persists.
            </strong>
          </Alert>
        </>
      );
    }
    return this.props.children;
  }
}
