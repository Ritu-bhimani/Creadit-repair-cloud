import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../../services';

const ClientAffliateResourcesApi = createApi({
  reducerPath: 'clientAffliateResourcesApi',
  baseQuery,
  endpoints: (build) => ({})
});
