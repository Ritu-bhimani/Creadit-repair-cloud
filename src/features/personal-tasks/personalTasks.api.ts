import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type Tasks = {
  tasks: PersonalTasks[];
};

type PersonalTasks = {
  client_id: number;
  description: string;
  id: number;
  reminder_type: string;
  status: string;
  subject: string;
};

type SelectedTask = {
  message: string;
  id: number;
  flag: boolean;
};
type ReminderTypes = {
  reminder_name: string;
};

type TaskTypes = {
  reminder_types: ReminderTypes[];
};
type ClientTypes = {
  id: number | string;
  first_name: string;
  last_name: string;
  type: string;
};

type addNewTask = {
  message: string;
  reminder_type: string | any;
  other_type: string;
  color: string;
  subject: string;
  start_date_reminder: any;
  start_date_time: string;
  end_date_reminder: any;
  end_date_time: string;
  client_id: string | number | any;
  team_id: string | number | any;
  notes: string;
  type: string;
  location: any;
  IsAllDayEvent: any;
};
type UserDetails = {
  uid: string;
  team_details: any;
};
const time = () => {
  var minutesInterval = 30; //minutes interval
  var times = []; // time array
  var startTime = 0; // start time
  var ap = ['am', 'pm']; // AM-PM
  for (var i = 0; startTime < 24 * 60; i++) {
    var hh = Math.floor(startTime / 60); // getting hours of day in 0-24 format
    var mm = startTime % 60; // getting minutes of the hour in 0-55 format
    let hours = hh % 12 == 0 ? 12 : hh % 12;
    times[i] = {
      label:
        ('0' + hours).slice(-2) +
        ':' +
        ('0' + mm).slice(-2) +
        ' ' +
        ap[Math.floor(hh / 12)],
      value: ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':00'
    }; // pushing data in array in [00:00 - 12:00 AM/PM format]
    startTime = startTime + minutesInterval;
  }
  return times;
};
export const timeOptions = time();

type AddTask = {
  type: string;
  id: number;
  status: string;
  ids: number;
};

export type AddTaskPayload = {
  reminder_type: string;
  other_type: string;
  color: string;
  subject: string;
  start_date_reminder: string;
  start_date_time: string;
  end_date_reminder: string;
  end_date_time: string;
  location: string;
  IsAllDayEvent: number;
  client_id: number;
  team_id: number;
  notes: string;
};

type UpdateTask = {
  id: number | any;
  reminder_type: string | any;
  other_type: string;
  subject: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  client_id: string | number | any;
  team_id: string | number | any;
  notes: string;
  color: string;
  location: string;
  IsAllDayEvent: boolean;
  message: any;
};

type selectedRows = {
  id: number;
};
type SelectedClient = {
  id?: number | string;
};
export type UpdateTaskPayload = {
  task_ids: selectedRows[];
};

export const personalTasksApi = createApi({
  reducerPath: 'personalTasks',
  baseQuery,
  tagTypes: ['PersonalTasks'],
  endpoints: (builder) => ({
    getPersonalTasks: builder.query<Tasks, null>({
      query: () => `${ENDPOINTS.PERSONAL_TASKS}`
    }),
    getRemaninderTypes: builder.query<TaskTypes, null>({
      query: () => `${ENDPOINTS.REMINDERS_TYPES}?type=event`
    }),
    markTaskAsCompletedOrIncomplete: builder.mutation<
      SelectedTask,
      Partial<SelectedTask>
    >({
      query: ({ id, flag }: SelectedTask) => ({
        url: `${ENDPOINTS.TASKS}/${id}`,
        method: 'PATCH',
        body: { flag: flag }
      })
    }),
    deleteTask: builder.mutation<SelectedTask, Partial<SelectedTask>>({
      query: ({ id }: SelectedTask) => ({
        url: `${ENDPOINTS.TASKS}/${id}`,
        method: 'DELETE'
      })
    }),
    updateScheduleTask: builder.mutation<UpdateTask, Partial<UpdateTask>>({
      query: ({
        id,
        reminder_type,
        other_type,
        subject,
        start_date,
        start_time,
        end_date,
        end_time,
        client_id,
        team_id,
        notes,
        color,
        location,
        IsAllDayEvent
      }: UpdateTask) => ({
        url: `${ENDPOINTS.TASKS}/${id}`,
        method: 'PUT',
        body: {
          reminder_type: reminder_type,
          other_type: other_type,
          subject: subject,
          start_date: start_date,
          start_time: start_time,
          end_date: end_date,
          end_time: end_time,
          client_id: client_id,
          team_id: team_id,
          notes: notes,
          color,
          location,
          IsAllDayEvent
        }
      })
    }),
    updateBulkTask: builder.mutation<AddTask, Partial<AddTask>>({
      query: ({ status }: AddTask) => ({
        url: `${ENDPOINTS.EVENT}/${status}`,
        method: 'PATCH'
      })
    }),
    deleteBulkTask: builder.mutation<AddTask, Partial<AddTask>>({
      query: ({ ids }: AddTask) => ({
        url: `${ENDPOINTS.EVENT}/${ids}`,
        method: 'DELETE'
      })
    }),
    getClientTypes: builder.query<ClientTypes, Partial<ClientTypes>>({
      query: ({ type }: ClientTypes) => ({
        url: `${ENDPOINTS.CLIENTS}?type=${type}`,
        method: 'GET'
      })
    }),
    getTeamMembersTypes: builder.query<ClientTypes, Partial<ClientTypes>>({
      query: ({ type }: ClientTypes) => ({
        url: `${ENDPOINTS.TEAM_MEMBERS}?type=${type}`,
        method: 'GET'
      })
    }),
    getTeamMembers: builder.query<SelectedClient, Partial<SelectedClient>>({
      query: ({ id }: SelectedClient) => ({
        url: `${ENDPOINTS.USERS}${id ? `/${id}` : `?type=active`}`,
        method: 'GET'
      })
    }),
    getLoginUser: builder.query<UserDetails, null>({
      query: () => `${ENDPOINTS.USER_DETAILS}`
    }),
    addNewTask: builder.mutation<addNewTask, Partial<addNewTask>>({
      query: ({
        reminder_type,
        other_type,
        subject,
        color,
        start_date_reminder,
        start_date_time,
        end_date_reminder,
        end_date_time,
        client_id,
        team_id,
        notes,
        IsAllDayEvent,
        type
      }: addNewTask) => ({
        url: `${ENDPOINTS.TASKS}?type=${type}`,
        method: 'POST',
        body: {
          reminder_type: reminder_type,
          other_type: other_type,
          subject: subject,
          color: color,
          start_date_reminder: start_date_reminder,
          start_date_time: start_date_time,
          end_date_reminder: end_date_reminder,
          end_date_time: end_date_time,
          client_id: client_id,
          team_id: team_id,
          notes: notes,
          IsAllDayEvent : IsAllDayEvent
        }
      })
    })
  })
});

export const {
  useGetPersonalTasksQuery,
  useMarkTaskAsCompletedOrIncompleteMutation,
  useGetRemaninderTypesQuery,
  useDeleteTaskMutation,
  useAddNewTaskMutation,
  useUpdateScheduleTaskMutation,
  useUpdateBulkTaskMutation,
  useDeleteBulkTaskMutation,
  useGetClientTypesQuery,
  useGetTeamMembersQuery,
  useGetTeamMembersTypesQuery,
  useGetLoginUserQuery
} = personalTasksApi;
