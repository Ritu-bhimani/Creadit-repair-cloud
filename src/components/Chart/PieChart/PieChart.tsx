import { Container } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { Cell, Legend, Pie, PieChart, Sector, Tooltip } from 'recharts';
import {
  NameType,
  ValueType
} from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';
import { ChartStyles } from '../styles';
type PieChartProps = {
  data?: any;
  height?: number;
  width?: number;
  colors?: any;
  customTooltip?: ContentType<ValueType, NameType>;
  xAxisDataKey?: string;
  pieDataKey?: any;
};

type PieChartDetails = {
  name: string;
  value?: number;
};

export const PieChartComponent: FC<PieChartProps> = (props: PieChartProps) => {
  const {
    data,
    height,
    width,
    colors,
    customTooltip,
    xAxisDataKey,
    pieDataKey
  } = props;
  const [activeIndex, setActiveIndex] = useState();
  const handleActiveShape = useCallback(
    (data: any, index: any) => {
      if (activeIndex == index) {
        setActiveIndex(undefined);
      } else {
        setActiveIndex(index);
      }
    },
    [activeIndex]
  );
  const RADIAN = Math.PI / 180;
  const renderActiveShape = (props: {
    cx: any;
    cy: any;
    innerRadius: any;
    outerRadius: any;
    startAngle: any;
    endAngle: any;
    midAngle: any;
    fill: any;
  }) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      midAngle,
      fill
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius - 40) * cos;
    const sy = cy + (outerRadius - 40) * sin;
    return (
      <Sector
        cx={sx}
        cy={sy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };
  const pieDetails = data.map((details: PieChartDetails)=>{ return {...details, name: `${details.name} (${details.value})`} })

  return (
    <Container css={ChartStyles.ChartCss}>
      <PieChart
        data={pieDetails}
        height={height ? height : 200}
        width={width ? width : 500}
      >
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ overflowY: 'auto', height: 'auto', top:'30px'}}
        />
        <Pie
          activeIndex={activeIndex}
          data={pieDetails}
          cx="50%"
          cy="50%"
          fontSize={'11px'}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={pieDataKey}
          innerRadius={20}
          activeShape={renderActiveShape}
          onClick={handleActiveShape}
          stroke=""
        >
          {pieDetails.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={customTooltip}
          cursor={{ fill: 'transparent' }}
          itemStyle={{ borderRadius: '0' }}
        />
      </PieChart>
    </Container>
  );
};

export default PieChartComponent;
