import { createApi } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../services';
import { baseQuery } from '../../services/baseQuery';

type errors = {
  id: string;
  cloudmail_letter_id: string;
  error_code: string;
  error_message: string;
  created_on: string;
  title: string;
};
type MailDetails = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  errors_count: number;
  errors: errors[];
};
export type notificationMail = {
  mail_errors: MailDetails[];
  count: number;
};

export const mailAPI = createApi({
  reducerPath: 'mail',
  baseQuery,
  tagTypes: ['Mail'],
  endpoints: (builder) => ({
    errors: builder.query({
      query: () => ENDPOINTS.MAIL_ERRORS
    }),
    messages: builder.query({
      query: () => ENDPOINTS.MAIL_MESSAGES
    })
  })
});

export const { useErrorsQuery, useMessagesQuery } = mailAPI;
