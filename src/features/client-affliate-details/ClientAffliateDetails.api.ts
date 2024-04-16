import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../../services';

export const clientAffliateDetailsAPI = createApi({
  reducerPath: 'clientAffliateDetails',
  baseQuery,
  endpoints: (builder) => ({
    getClientAffliateDetails: builder.query({
      query: () => 'posts/1'
    })
  })
});
