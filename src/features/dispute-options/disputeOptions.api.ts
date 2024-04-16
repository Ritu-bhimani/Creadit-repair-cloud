import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';


export type DisputeOp = {
    id: number;
    name: string;
    address: string;
    logo: string;
    status: string;
};

type SelectedOp = {
    id: number | any;
    message: any;
    company_name: string;
    address: string;
    urbanización: string;
    city: string;
    state: string;
    zip_code: string;
};

export const disputeOptionsAPI = createApi({
  reducerPath: 'disputeOptions',
  baseQuery,
  tagTypes: ['DisputeOptions'],
  endpoints: (builder) => ({
    getDisputeOption: builder.query<DisputeOp, null>({
      query: () => `${ENDPOINTS.BUREAUS}`
    }),
    updateDispute: builder.mutation<SelectedOp, Partial<SelectedOp>>({
      query: ({ id, 
        company_name,
        address,
        city,
        state,
        zip_code
     }: SelectedOp) => ({
        url: `${ENDPOINTS.BUREAUS}/${id}`,
        method: 'PUT',
        body: {
            id : id,
            company_name : company_name,
            address : address,
            city : city,
            state : state,
            zip_code : zip_code,
          }
      })
    }),
    resetDispute: builder.mutation<SelectedOp, Partial<SelectedOp>>({
        query: ({ id }: SelectedOp) => ({
          url: `${ENDPOINTS.BUREAUS}/${id}`,
          method: 'PATCH',
        })
      })
  })
});

export const { useGetDisputeOptionQuery,
                useUpdateDisputeMutation,  
                useResetDisputeMutation,  
            } =
disputeOptionsAPI;
