import { render } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

it('should render and match the snapshot', async () => {
  const component = render(<LoginForm onSubmit={(): void => {}} />);
  expect(component).toMatchSnapshot();
});
