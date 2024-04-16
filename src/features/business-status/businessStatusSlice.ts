import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get, keyBy, map, uniq } from 'lodash-es';
import { api, ENDPOINTS } from '../../services';
import { AppThunk } from '../../store';
type BusinessStatusList = {
  options: any;
};
type LeadSelectData = {
  name: string;
  lead: number;
  client: number;
};
type DisputeSelectData = {
  name: string;
  value: number;
};
export interface BusinessStatusState {
  businessStatusList: BusinessStatusList[];
  isLoading: boolean;
  seletedStatusData: any[];
  selectedValue: string;
}
const options = [
  {
    label: 'Active Clients',
    value: 'client'
  },
  {
    label: 'Affiliates',
    value: 'affiliate'
  },
  {
    label: 'Leads',
    value: 'leads'
  },
  {
    label: 'Client Success',
    value: 'dispute_status'
  }
];
const initialState: BusinessStatusState = {
  businessStatusList: [{ options: options }],
  isLoading: false,
  seletedStatusData: [],
  selectedValue: 'client'
};
export const businessStatusSlice = createSlice({
  name: 'businessStatus',
  initialState,
  reducers: {
    setSelectedValue: (state, { payload }: PayloadAction<string>) => {
      state.selectedValue = payload;
    },
    setSeletedStatusData: (state, { payload }: PayloadAction<any[]>) => {
      state.seletedStatusData = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    }
  }
});
export const { setSelectedValue, setSeletedStatusData, setLoading } =
  businessStatusSlice.actions;
export const loadBusinessStatus =
  (selectedValue: string): AppThunk =>
  async (dispatch) => {
    dispatch(setSelectedValue(selectedValue));
    dispatch(setLoading(true));
    if (selectedValue === 'client') {
      api
        .get(ENDPOINTS.ANALYTICS_CLIENTS)
        .then((res) => {
          const data = res.data;
          dispatch(setSeletedStatusData(data.clients_analytics));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    } else if (selectedValue === 'affiliate') {
      api
        .get(ENDPOINTS.ANALYTICS_AFFILIATE)
        .then((res) => {
          const data = res.data;
          dispatch(setSeletedStatusData(data.affiliate));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    } else if (selectedValue === 'dispute_status') {
      api
        .get(ENDPOINTS.ANALYTICS_CLIENT_SUCCESS)
        .then((res) => {
          const data = res.data.dispute;
          const dispute: DisputeSelectData[] = data.map((d: any) => ({
            name: d.status,
            value: d.count
          }));
          dispatch(setSeletedStatusData(dispute));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    } else if (selectedValue === 'leads') {
      api
        .get(ENDPOINTS.ANALYTICS_LEADS)
        .then((res) => {
          const data = res.data;
          const leadsByMonth = keyBy(data.clients_analytics.leads, 'month');
          const clientsByMonth = keyBy(data.clients_analytics.clients, 'month');
          const months = uniq(
            map(
              [
                ...data.clients_analytics.leads,
                ...data.clients_analytics.clients
              ],
              'month'
            )
          );
          const leadData: LeadSelectData[] = months.map((month) => ({
            name: month,
            lead: get(leadsByMonth, [month, 'count'], 0),
            client: get(clientsByMonth, [month, 'count'], 0)
          }));
          dispatch(setSeletedStatusData(leadData));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    }
  };
