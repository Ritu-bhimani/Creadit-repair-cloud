import { render, screen } from '@testing-library/react';
import { LoginHeader } from '../LoginHeader';

it('Login Header should match the sanpshot', () => {
  const component = render(<LoginHeader imageSrc={''} loginType={''} />);
  expect(component).toMatchSnapshot();
});

it('expect the login type rendered as Team member', () => {
  render(<LoginHeader imageSrc="" loginType="Team Member" />);
  expect(screen.getByTestId('title').textContent).toBe('Team Member');
});
