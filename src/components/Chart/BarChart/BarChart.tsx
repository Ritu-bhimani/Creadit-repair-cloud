import { Container } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  NameType,
  ValueType
} from 'recharts/types/component/DefaultTooltipContent';
import { ChartStyles } from '../styles';

import { ContentType } from 'recharts/types/component/Tooltip';

type BarChartProps = {
  data?: any;
  height?: number;
  width?: number;
  primary?: boolean;
  customTooltip?: ContentType<ValueType, NameType>;
  xAxisDataKey?: string;
  barDataKey?: any;
  barDataKey2?: any;
  renderCustomBarLabel?: any;
  getChartType?: any;
  selectedDefaultLegend?: any;
};

type BarDetailsProps = {
  count: number;
  month: string;
};

export const BarChartComponent: FC<BarChartProps> = (props: BarChartProps) => {
  const {
    data,
    height,
    width,
    primary,
    customTooltip,
    xAxisDataKey,
    barDataKey,
    barDataKey2,
    renderCustomBarLabel,
    getChartType,
    selectedDefaultLegend
  } = props;
  const barDetails: BarDetailsProps[] = [];
  const [selectedLedgend, setSelectedLedgend] = useState<any>([]);

  useEffect(() => {
    selectedDefaultLegend && selectedDefaultLegend(selectedLedgend);
  }, [selectedLedgend]);

  data.map((details: { count: number; month: string }, i: number) => {
    barDetails.push({
      ...details,
      count: i > 0 ? barDetails[i - 1].count + details.count : details.count
    });
  });

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div
        css={{
          display: 'flex',
          border: 'solid 1px #4a4a4a',
          width: '180px',
          justifyContent: 'space-between',
          padding: '0 5px'
        }}
      >
        {payload.map((entry: { value: string }, index: number) => (
          <div
            css={{ display: 'flex', alignItems: 'center' }}
            onClick={() =>
              selectedLedgend.includes(entry.value)
                ? setSelectedLedgend(
                    selectedLedgend.filter(
                      (defaultVal: string) => entry.value != defaultVal
                    )
                  )
                : setSelectedLedgend([...selectedLedgend, entry.value])
            }
          >
            <img
              src={
                selectedLedgend.includes(entry.value)
                  ? '/assets/images/disableChart.png'
                  : entry.value == 'lead'
                  ? '/assets/images/lead.png'
                  : '/assets/images/client.png'
              }
            />
            <li
              css={{ listStyle: 'none', color: '#555 !important' }}
              key={`item-${index}`}
              style={{
                color: selectedLedgend.includes(entry.value) ? 'grey' : 'black'
              }}
            >
              {entry.value == 'lead' ? 'Lead' : 'Active Client'}
            </li>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Container css={ChartStyles.ChartCss}>
      <BarChart
        data={barDetails}
        height={height ? height : 200}
        width={width ? width : 490}
        margin={{ top: 20, right: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="0 0" vertical={false} />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip
          content={customTooltip}
          cursor={{ fill: 'transparent' }}
          itemStyle={{ borderRadius: '0' }}
        />
        {primary ? (
          <Bar
            dataKey={barDataKey}
            barSize={50}
            fill="#599ddd"
            label={renderCustomBarLabel}
          />
        ) : (
          <>
            <Bar
              minPointSize={5}
              dataKey={barDataKey}
              barSize={40}
              fill={
                !selectedLedgend.includes('lead') ? '#599ddd' : 'transparent'
              }
              label={renderCustomBarLabel}
              onMouseOver={() => getChartType(barDataKey)}
            />

            <Bar
              dataKey={barDataKey2}
              barSize={40}
              fill={
                !selectedLedgend.includes('client') ? '#a5db89' : 'transparent'
              }
              label={renderCustomBarLabel}
              onMouseOver={() => getChartType(barDataKey2)}
            />

            <Legend content={renderLegend} />
          </>
        )}
      </BarChart>
    </Container>
  );
};

export default BarChartComponent;
