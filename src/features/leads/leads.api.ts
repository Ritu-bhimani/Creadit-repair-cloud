import { createApi } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../services';
import { baseQuery } from '../../services/baseQuery';

type LeadDetails = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_home: string;
  phone_work: string;
  mobile: string;
  fax: string;
  address: string;
  city: string;
  state: string;
  zip_code: number;
  dob: string;
  last_4_ssn: string;
  memo: string;
  referred_first_name: string;
  referred_last_name: string;
  source_url: string;
  source_ip_address: string;
};
export const leadsAPI = createApi({
  reducerPath: 'leads',
  baseQuery,
  tagTypes: ['Leads'],
  endpoints: (builder) => ({
    getLeads: builder.query({
      query: (args) => `notifications/clients`
    }),
    getLeadsDetails: builder.query<LeadDetails, Partial<LeadDetails>>({
      query: ({ id }) => ({
        url: `${ENDPOINTS.CLIENT_NOTIFICATION}/${id}`,
        method: 'GET'
      })
    }),
    deleteLead: builder.mutation<{ message: string }, Partial<LeadDetails>>({
      query: ({ id }) => ({
        url: `${ENDPOINTS.CLIENT_NOTIFICATION}/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetLeadsQuery,
  useGetLeadsDetailsQuery,
  useDeleteLeadMutation
} = leadsAPI;
