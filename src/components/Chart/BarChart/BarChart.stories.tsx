import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChartStyles } from '../styles';
import { BarChartComponent } from './BarChart';

export default {
    title: 'Bar chart',
    component: BarChartComponent
} as ComponentMeta<typeof BarChartComponent>;

const Template: ComponentStory<typeof BarChartComponent> = (args) => (
    <BarChartComponent {...args} />
);
let tooltipType = '';
const selectedToolTip = (val: any | undefined) => {
    if (val !== null)
        tooltipType = val
};
type CustomToolTipProps = {
    active?: boolean;
    payload?: any;
    label?: string;
    cursor?: any;
    style?: any;
    primary?: boolean;
}
const CustomTooltip = (props: CustomToolTipProps) => {
    if (props.active && props.payload && props.payload.length && props.primary) {
        return (
            <div css={ChartStyles.customTooltip} >
                <p className="label">{`${props.payload[0].value} Affiliates`}</p>
            </div>
        );
    } else if (props.active && props.payload && props.payload.length && !props.primary) {
        for (const bar of props.payload)
            if (bar.dataKey === tooltipType)
                return (
                    <div css={ChartStyles.customTooltip} >
                        <p className="label">{`${bar.name === 'client' ? "Active Client" : "Leads"}, ${props.label}, ${bar.value}`}</p>
                    </div>
                );
        return null
    }

    return null;
};
type renderCustomBarLabelProps = {
    payload?: any;
    x: number;
    y: number;
    width: number;
    value: number;
}
const renderCustomBarLabel = (props: renderCustomBarLabelProps) => {
    const { payload, x, y, width, value } = props
    return (
        <text
            x={x + width / 2}
            y={y}
            fill="#666"
            textAnchor="middle"
            dy={-6}
        >{`${value}`}</text>
    );
};
export const Primary = Template.bind({});

Primary.args = {
    primary: true,
    data: [
        {
            name: 'Aug 22',
            value: 2400,
        },
        {
            name: 'Sep 22',
            value: 1398,
        },
        {
            name: 'Oct 22',
            value: 9800,
        },
        {
            name: 'Nov 22',
            value: 3908,
        },
        {
            name: 'Dec 22',
            value: 3908,
        },
        {
            name: 'Jan 22',
            value: 4800,
        }
    ],
    height: 155,
    width: 500,
    customTooltip: <CustomTooltip primary={true} />,
    xAxisDataKey: "name",
    barDataKey: "value",
    renderCustomBarLabel: renderCustomBarLabel
};


export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    primary: false,
    height: 155,
    width: 500,
    customTooltip: <CustomTooltip primary={false} />,
    xAxisDataKey: "name",
    barDataKey: "lead",
    barDataKey2: "client",
    data: [
        {
            name: 'Aug 22',
            lead: 300,
            client: 2400,
        },
        {
            name: 'Sep 22',
            lead: 315,
            client: 1398,
        },
        {
            name: 'Oct 22',
            lead: 330,
            client: 9800,
        },
        {
            name: 'Nov 22',
            lead: 340,
            client: 3908,
        },
        {
            name: 'Dec 22',
            leads: 340,
            client: 3908,
        },
        {
            name: 'Jan 22',
            leads: 340,
            client: 4800,
        }
    ],
    getChartType: selectedToolTip
};


