import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type taskType = {
  type: string;
};

type event = {
  Color: string;
  Description: string;
  EndTime: string;
  Id: number;
  IsAllDayEvent: string;
  IsRead: string;
  Location: string;
  RecurringRule: string;
  StartTime: string;
  Subject: string;
  created_by: string;
  cronjob_reference_id: number;
  estatus: string;
  iTeam_id: number;
  iclient_id: number;
  reminder_type: string;
  iclient_status: string;
  vclient_fname: string;
  vclient_lname: string;
  gender: string;
  vPhoto: string;
  event: any;
};
type events = {
  event: event[];
};

type allEvents = {
  admin_email: string;
  type: string;
  username: string;
  events: events[];
};

type TaskEvent = {
  type: string;
  events: any;
  agenda: events[];
  selected_team_memebr_id: number;
  todays_reminders: events[];
  user_task_permissions: string;
  all_completed_tasks: events[];
  completed_tasks: events[];
  expired_tasks: events[];
};

type client = {
  id: number;
  first_name: string;
  last_name: string;
};

type tasks = {
  client: client[];
  cronjob_reference_id: number;
  id: number;
  reminder_type: string;
  start_time: string;
  status: string;
  subject: string;
};

type AllTask = {
  param?: string;
  page: number;
  limit: number;
  page_limit: string;
  tasks: tasks[];
  total: number;
};

export const tasksAPI = createApi({
  reducerPath: 'tasks',
  baseQuery,
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getAllEvents: builder.query<allEvents, Partial<allEvents>>({
      query: ({ type }: taskType) => ({
        url: `${ENDPOINTS.TASKS}?type=${type}`,
        method: 'GET'
      })
    }),
    getTaskEvent: builder.query<TaskEvent, null>({
      query: () => `${ENDPOINTS.TASKS}?type=current&page=1&limit=10`
    }),
    getTaskComplate: builder.query<TaskEvent, null>({
      query: () => `${ENDPOINTS.TASKS}?type=completed&page=1&limit=10`
    }),
    getTaskIncomplate: builder.query<AllTask, Partial<AllTask>>({
      query: ({ param, page, limit }: AllTask) => ({
        url: `${ENDPOINTS.TASKS}/search?page=${page}&limit=${limit}`,
        method: 'GET'
      })
    }),
    getFilterBET: builder.query<AllTask, Partial<AllTask>>({
      query: ({ param, page, limit }: AllTask) => ({
        url: `${ENDPOINTS.TASKS}/search?${param}&page=${page}&limit=${limit}`,
        method: 'GET'
      })
    })
  })
});

export const {
  useGetAllEventsQuery,
  useGetTaskEventQuery,
  useGetTaskComplateQuery,
  useGetTaskIncomplateQuery,
  useGetFilterBETQuery
} = tasksAPI;
