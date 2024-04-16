import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { useAuth } from '../hooks';
import { API_BASE_URL } from './api-client';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { getToken } = useAuth();
    const token = getToken();
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  }
});
