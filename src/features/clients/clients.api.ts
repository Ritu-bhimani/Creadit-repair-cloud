import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';



type ClientDetails = {
  type: string;
  first_name: string;
  id: number;
  last_name: string;
  title: string;
}

export const clientsAPI = createApi({
  reducerPath: 'clients',
  baseQuery,
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    getClient: builder.query<ClientDetails, Partial<ClientDetails>>({
        query: ({ type }: ClientDetails) => ({
          url: `${ENDPOINTS.CLIENTS}?type=${type}`,
          method: 'GET'
        })
      }),
  })
});

export const { 
  useGetClientQuery, 
} = clientsAPI;
