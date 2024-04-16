import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type Event = {
  Id: number;
  Subject: string;
  StartTime: Date;
};
export type CurrentSchedule = {
  todays_event: Event[];
};

type SelectedTask = {
  id: number | any;
};

export const currentScheduleAPI = createApi({
  reducerPath: 'currentSchedule',
  baseQuery,
  tagTypes: ['CurrentSchedule'],
  endpoints: (builder) => ({
    getCurrentTasks: builder.query<CurrentSchedule, null>({
      query: () => `${ENDPOINTS.TASKS}?type=today`
    }),
    deleteTask: builder.mutation<SelectedTask, Partial<SelectedTask>>({
      query: ({ id }: SelectedTask) => ({
        url: `${ENDPOINTS.TASKS}/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useGetCurrentTasksQuery, useDeleteTaskMutation } =
  currentScheduleAPI;
