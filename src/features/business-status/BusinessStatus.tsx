import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AreaChartComponent,
  BarChartComponent,
  PieChartComponent,
  SearchableDropdown
} from '../../components';
import { RootState, useAppDispatch } from '../../store';
import { BusinessStatusState, loadBusinessStatus } from './businessStatusSlice';
import { businessStatusStyles } from './styles';
export const BuisnessStatus = () => {
  const {
    businessStatusList,
    isLoading,
    selectedValue,
    seletedStatusData
  }: BusinessStatusState = useSelector<RootState, BusinessStatusState>(
    (state) => state.businessStatus
  );
  const styles = businessStatusStyles;
  const [selectedDefaultLedgend, setSelectedDefaultLedgend] = useState<
    string[]
  >([]);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadBusinessStatus(selectedValue));
  }, []);
  let tooltipType = '';
  const selectedToolTip = (val: any | undefined) => {
    if (val !== null) tooltipType = val;
  };
  type CustomToolTipProps = {
    active?: boolean;
    payload?: any;
    label?: string;
    cursor?: any;
    style?: any;
    primary?: any;
  };
  const AreaCustomTooltip = (props: CustomToolTipProps) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div css={styles.customTooltip}>
          <p className="label">{`Client Count: ${props.label} (${props.payload[0].value})`}</p>
        </div>
      );
    }
    return null;
  };
  const BarCustomTooltip = (props: CustomToolTipProps) => {
    if (
      props.active &&
      props.payload &&
      props.payload.length &&
      props.primary
    ) {
      return (
        <div css={styles.customTooltip}>
          <p className="label">{`${props.payload[0].value} Affiliates`}</p>
        </div>
      );
    } else if (
      props.active &&
      props.payload &&
      props.payload.length &&
      !props.primary
    ) {
      for (const bar of props.payload) {
        if (bar.dataKey === tooltipType)
          return (
            <div css={styles.customTooltip}>
              <p className="label">{`${
                bar.name === 'client' ? 'Active Client' : 'Lead'
              }, ${props.label}, ${bar.value}`}</p>
            </div>
          );
      }
    }
    return null;
  };
  const PiaCustomTooltip = (props: CustomToolTipProps) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div css={styles.customTooltip}>
          <p className="label">{`${props.payload[0].value}-${props.payload[0].name}`}</p>
        </div>
      );
    }
    return null;
  };
  type renderCustomBarLabelProps = {
    payload?: any;
    x: number;
    y: number;
    width: number;
    value: number;
  };
  const renderCustomBarLabel = (props: renderCustomBarLabelProps) => {
    const { payload, x, y, width, value } = props;
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
  return (
    <>
      <Grid sx={{ display: 'flex' }}>
        <Grid item xs={6}>
          <Typography css={styles.title}>{t('DetailStatus')}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={''}> {t('DetailDashboard')}</Link>
        </Grid>
      </Grid>
      <Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <div css={styles.dropDown}>
              <SearchableDropdown
                options={businessStatusList[0].options}
                value={selectedValue}
                onChange={(value: any) => dispatch(loadBusinessStatus(value))}
              />
            </div>
            {selectedValue === 'client' ? (
              <AreaChartComponent
                data={seletedStatusData}
                xAxisDataKey="month"
                areaDataKey="count"
                customTooltip={<AreaCustomTooltip />}
              />
            ) : selectedValue === 'affiliate' ? (
              <BarChartComponent
                data={seletedStatusData}
                xAxisDataKey="month"
                barDataKey="count"
                getChartType={selectedToolTip}
                primary={true}
                renderCustomBarLabel={renderCustomBarLabel}
                height={155}
                customTooltip={<BarCustomTooltip primary={true} />}
              />
            ) : selectedValue === 'leads' ? (
              <BarChartComponent
                data={seletedStatusData}
                primary={false}
                getChartType={selectedToolTip}
                xAxisDataKey="name"
                barDataKey="lead"
                barDataKey2="client"
                height={155}
                customTooltip={<BarCustomTooltip primary={false} />}
                selectedDefaultLegend={setSelectedDefaultLedgend}
              />
            ) : selectedValue === 'dispute_status' ? (
              <PieChartComponent
                data={seletedStatusData}
                colors={['#ffc107', '#00C49F', '#FFBB28', '#FF8042', '#a5db89']}
                customTooltip={<PiaCustomTooltip />}
                xAxisDataKey="status"
                pieDataKey="value"
              />
            ) : null}
          </Box>
        )}
      </Box>
    </>
  );
};
