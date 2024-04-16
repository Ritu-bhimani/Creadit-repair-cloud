import { render } from '@testing-library/react';
import { BarChartComponent } from "../BarChart"
it('should render Bar chart and match the snapshot', () => {
    const component = render(<BarChartComponent data={[]} />);
    expect(component).toMatchSnapshot();
});