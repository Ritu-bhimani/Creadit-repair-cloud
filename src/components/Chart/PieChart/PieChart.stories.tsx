import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChartStyles } from '../styles';
import { PieChartComponent } from './PieChart';

export default {
    title: 'Pie chart',
    component: PieChartComponent
} as ComponentMeta<typeof PieChartComponent>;

const Template: ComponentStory<typeof PieChartComponent> = (args) => (
    <PieChartComponent {...args} />
);
type CustomToolTipProps = {
    active?: boolean;
    payload?: any;
    label?: string;
    cursor?: any;
    style?: any;
}
const CustomTooltip = (props: CustomToolTipProps) => {
    if (props.active && props.payload && props.payload.length) {
        return (
            <div css={ChartStyles.customTooltip} >
                <p className="label">{`${props.payload[0].value}-${props.payload[0].name}`}</p>
            </div>
        );
    }

    return null;
};

export const Primary = Template.bind({});

Primary.args = {
    data: [
        { name: 'Android', value: 10 },
        { name: 'Apple iOS', value: 20 },
        { name: 'Blackberry', value: 25 },
        { name: 'Windows Phone', value: 33 },
        { name: 'Others', value: 10 }
    ],

    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a5db89'],
    height: 200,
    width: 500,
    customTooltip: <CustomTooltip />,
    xAxisDataKey: "name",
    pieDataKey: "value",
};
