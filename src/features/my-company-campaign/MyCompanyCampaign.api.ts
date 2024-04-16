import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type ActiveCampaignAPIKEY = {
  domain: string;
  api_key: string;
};

export const myCompanyCampaignAPI = createApi({
  reducerPath: 'myCompanyCampaign',
  baseQuery,
  endpoints: (builder) => ({
    submitAPIKey: builder.mutation<
      ActiveCampaignAPIKEY,
      Partial<ActiveCampaignAPIKEY>
    >({
      query: ({ api_key, domain }) => ({
        url: ENDPOINTS.ACTIVE_CAMPAIGN,
        method: 'PUT',
        body: { 'api-key': api_key, domain: domain }
      })
    }),
    getAPIKey: builder.query<null, any>({
      query: () => ({
        url: ENDPOINTS.ACTIVE_CAMPAIGN
      })
    }),
    disableCampaign: builder.mutation<null, any>({
      query: () => ({
        url: ENDPOINTS.ACTIVE_CAMPAIGN,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useSubmitAPIKeyMutation,
  useGetAPIKeyQuery,
  useDisableCampaignMutation
} = myCompanyCampaignAPI;
