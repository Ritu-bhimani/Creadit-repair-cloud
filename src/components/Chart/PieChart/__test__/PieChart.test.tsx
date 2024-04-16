import { render } from '@testing-library/react';
import { PieChartComponent } from '../PieChart';
it('should render Pie chart and match the snapshot', () => {
  const component = render(<PieChartComponent data={[]} />);
  expect(component).toMatchSnapshot();
});
