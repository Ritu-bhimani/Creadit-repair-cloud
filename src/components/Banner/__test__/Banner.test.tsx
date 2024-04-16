import { render } from '@testing-library/react';
import { Banner } from '../Banner';
it('loads and displays banner', () => {
  const component = render(<Banner showModel={true} setShowModal={true} />);
  expect(component).toMatchSnapshot();
});
