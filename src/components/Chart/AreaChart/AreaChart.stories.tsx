import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChartStyles } from '../styles';
import { AreaChartComponent } from './AreaChart';

export default {
    title: 'Area chart',
    component: AreaChartComponent
} as ComponentMeta<typeof AreaChartComponent>;

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
                <p className="label">{`Client Count: ${props.label} (${props.payload[0].value})`}</p>
            </div>
        );
    }
    return null;
};
const Template: ComponentStory<typeof AreaChartComponent> = (args) => (
    <AreaChartComponent {...args} />
);
export const Primary = Template.bind({});

Primary.args = {
    xAxisDataKey: "name",
    areaDataKey: "value",
    height: 155,
    width: 500,
    data: [
        {
            name: 'Aug 22',
            value: 300,
        },
        {
            name: 'Sep 22',
            value: 315,
        },
        {
            name: 'Oct 22',
            value: 330,
        },
        {
            name: 'Nov 22',
            value: 340,
        },
        {
            name: 'Dec 22',
            value: 340,
        },
        {
            name: 'Jan 22',
            value: 400
        }
    ],
    customTooltip: <CustomTooltip />
};
