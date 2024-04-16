import { render } from '@testing-library/react';
import { LoginFooter } from '../LoginFooter';

it('should render Login footer and match the snapshot', () => {
  const component = render(<LoginFooter trainingLink={''} />);
  expect(component).toMatchSnapshot();
});
