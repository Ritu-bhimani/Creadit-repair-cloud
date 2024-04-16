import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

export type calendarData = {
  message: any;
  subject: string;
  start_date_reminder: string;
  start_date_time: string;
  end_date_reminder: string;
  end_date_time: string;
};

type ImportCal = {
  upload_ics: any;
  message: any;
};

type ExportCal = {
  export_ics: any;
  message: any;
};

export const calendarAPI = createApi({
  reducerPath: 'calendar',
  baseQuery,
  tagTypes: ['Calendar'],
  endpoints: (builder) => ({
    addNewCalendarTask: builder.mutation<calendarData, Partial<calendarData>>({
      query: ({
        subject,
        start_date_reminder,
        start_date_time,
        end_date_reminder,
        end_date_time
      }: calendarData) => ({
        url: `${ENDPOINTS.TASKS}?type=event`,
        method: 'POST',
        body: {
          subject: subject,
          start_date_reminder: start_date_reminder,
          start_date_time: start_date_time,
          end_date_reminder: end_date_reminder,
          end_date_time: end_date_time
        }
      })
    }),
    importCalender: builder.mutation<ImportCal, Partial<ImportCal>>({
      query: (data) => ({
        url: `${ENDPOINTS.EVENT_IMPORT}`,
        method: 'POST',
        credentials: 'include',
        // headers: {
        //   'Content-Type': `multipart/form-data;`,
        // },
        body: data
      })
    }),
    exportCalender: builder.mutation<ExportCal, Partial<ExportCal>>({
      query: () => ({
        url: `${ENDPOINTS.EVENT_EXPORT}`,
        method: 'GET',
        credentials: 'same-origin'
      })
    })
  })
});

export const {
  useAddNewCalendarTaskMutation,
  useImportCalenderMutation,
  useExportCalenderMutation
} = calendarAPI;
