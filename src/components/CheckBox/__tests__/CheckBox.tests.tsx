import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CheckBox } from '../CheckBox';

describe('Test CheckBox Component', () => {
  it('should render Login footer and match the snapshot', () => {
    const component = render(
      <CheckBox label={''} checked={false} onChange={() => {}} id="" />
    );
    expect(component).toMatchSnapshot();
  });
});
