import { createApi } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../services';
import { baseQuery } from '../../services/baseQuery';

export type SetDefautType = {
  id: number;
  flag: string;
};

type OptionType = {
  title: string;
  description: string;
  id?: number;
};

export const invoiceAPI = createApi({
  reducerPath: 'invoice',
  baseQuery,
  endpoints: (builder) => ({
    invoice: builder.query({
      query: () => ENDPOINTS.INVOICE_OPTIONS
    }),
    setAsdefault: builder.mutation<SetDefautType, any>({
      query: ({ id, flag }: SetDefautType) => ({
        url: `${ENDPOINTS.INVOICE_OPTIONS}/${id}`,
        body: { flag: flag },
        method: 'PATCH'
      })
    }),
    addInvoice: builder.mutation<OptionType, any>({
      query: ({ title, description }) => ({
        url: ENDPOINTS.INVOICE_OPTIONS,
        method: 'POST',
        body: {
          title: title,
          description: description
        }
      })
    }),
    updateInvoice: builder.mutation<OptionType, any>({
      query: ({ title, description, id }) => ({
        url: `${ENDPOINTS.INVOICE_OPTIONS}/${id}`,
        method: 'PUT',
        body: {
          title: title,
          description: description
        }
      })
    }),
    previewInvoice: builder.query<null, any>({
      query: () => `${ENDPOINTS.INVOICE_OPTIONS}/preview`
    })
  })
});
export const {
  useInvoiceQuery,
  useSetAsdefaultMutation,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  usePreviewInvoiceQuery
} = invoiceAPI;
