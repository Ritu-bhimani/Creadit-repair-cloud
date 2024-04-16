import { Container } from '@mui/material';
import { reduce } from 'lodash-es';
import { FC } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  NameType,
  ValueType
} from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';
import { ChartStyles } from '../styles';

type AreaChartProps = {
  data?: any;
  height?: number;
  width?: number;
  customTooltip?: ContentType<ValueType, NameType>;
  xAxisDataKey?: string;
  areaDataKey?: any;
};
type AreaChartDetails = {
  count: number;
  month: string;
};
export const AreaChartComponent: FC<AreaChartProps> = (
  props: AreaChartProps
) => {
  const { data, height, width, customTooltip, xAxisDataKey, areaDataKey } =
    props;
  const areaDetails: AreaChartDetails[] = reduce(
    data,
    (result: AreaChartDetails[], current: AreaChartDetails, index: number) => {
      const previousCount = result[index - 1]?.count ?? 0;
      const count = Math.max(previousCount, current.count);
      result.push({ ...current, count });
      return result;
    },
    []
  );
  return (
    <Container css={ChartStyles.ChartCss}>
      <AreaChart
        data={areaDetails}
        height={height ? height : 155}
        width={width ? width : 490}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="0 0" vertical={false} />
        <XAxis dataKey={xAxisDataKey} color="#5b626b" />
        <YAxis color="#5b626b" />
        <Tooltip
          content={customTooltip}
          itemStyle={{ borderRadius: '0px' }}
          cursor={{ fill: 'transparent' }}
        />
        <Area
          type="monotone"
          dataKey={areaDataKey}
          stroke="rgb(117, 200, 74)"
          fill="#75c84a47"
          activeDot={{
            fill: 'rgb(117, 200, 74)',
            stroke: '#acd697',
            strokeWidth: 1,
            r: 4,
            className: 'boxShadow'
          }}
          dot={{
            fill: ' rgb(117, 200, 74)',
            stroke: ' rgb(117, 200, 74)',
            strokeWidth: 5,
            r: 2,
            className: 'boxShadow'
          }}
          style={{ stroke: 'rgb(117, 200, 74)' }}
        />
      </AreaChart>
    </Container>
  );
};

export default AreaChartComponent;
