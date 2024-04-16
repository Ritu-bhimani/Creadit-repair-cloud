import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type LogDetails = {
  Id: number;
  username: string;
  location: string;
  ipaddress: string;
  devicetype: string;
  login_time: string;
  logout_time: string;
};

type LoginHistory = {
  page_limit: number;
  total: number;
  log_details: LogDetails;
};

export const loginHistoryAPI = createApi({
  reducerPath: 'loginHistory',
  baseQuery,
  tagTypes: ['LoginHistory'],
  endpoints: (builder) => ({
    getLoginHistory: builder.query<LoginHistory, null>({
      query: () => `${ENDPOINTS.LOGIN_HISTORY}?limit=10&type=all&page=1`
    })
  })
});

export const { useGetLoginHistoryQuery } = loginHistoryAPI;
