import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../services/baseQuery';

export type Message = {
  id: number;
  body: string;
  subject: string;
  sender_type: string;
  recipient_type: string;
  sender_id: number;
  recipient_id: number;
  sent_on: string;
  is_read: string;
  sender_first_name: string;
  sender_last_name: string;
  gender: string;
  photo: string;
};

export const messagesAPI = createApi({
  reducerPath: 'unReadMessages',
  baseQuery,
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getUnreadMessages: builder.query({
      query: (args) => `messages`
    })
  })
});

export const { useGetUnreadMessagesQuery } = messagesAPI;
