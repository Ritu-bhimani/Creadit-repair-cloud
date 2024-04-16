import { createApi } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../services';
import { baseQuery } from '../../services/baseQuery';

type TaskType = {
  Id: number;
  status: string;
  client_id: null;
  reminder_type: string;
  first_name: string;
  last_name: string;
  client_status: number;
  Subject: string;
  StartTime: string;
  EndTime: string;
};
export type TaskNotification = {
  count: number;
  overDue: TaskType[];
  upComing: TaskType[];
  toDay: TaskType[];
};

export const notificationTaskAPI = createApi({
  reducerPath: 'notification-task',
  baseQuery,
  tagTypes: ['notificationTask'],
  endpoints: (builder) => ({
    notificationTask: builder.query({
      query: (args) => ENDPOINTS.TASK_NOTIFICATION
    })
  })
});

export const { useNotificationTaskQuery } = notificationTaskAPI;
