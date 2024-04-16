import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../ErrorBoundary';

const BuggyComponant = () => {
  throw new Error('Im Buggy');
};

describe('Test Error Boundaries for the normal and the error flows', () => {
  it('should show error when a wrapped component throws error', () => {
    render(<ErrorBoundary>{<BuggyComponant />}</ErrorBoundary>);
    expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument();
  });
});
