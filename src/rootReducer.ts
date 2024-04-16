/**TODO: due to vite issue imports are made directly change it further*/
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './features/auth/authSlice';
import { businessStatusSlice } from './features/business-status/businessStatusSlice';
import { calendarAPI } from './features/calendar';
import { changePasswordAPI } from './features/change-password/changePassword.api';
import { currentScheduleAPI } from './features/current-schedule/currentSchedule.api';
import { mailAPI } from './features/email/mail.api';
import headerSlice from './features/header/headerSlice';
import { leadsAPI } from './features/leads';
import { loginHistoryAPI } from './features/login-history/loginHistory.api';
import { forgotPasswordApi } from './features/forgot-password/forgotPassword.api';
import { messagesAPI } from './features/messages';
import { notificationTaskAPI } from './features/notification-task';
import { personalTasksApi } from './features/personal-tasks/personalTasks.api';
import { tasksAPI } from './features/tasks/tasks.api';
import { myCompanyProfileApi } from './features/my-company-profile/MyCompanyProfile.api';
import { disputeOptionsAPI } from './features/dispute-options/disputeOptions.api';
import { myTeamMembersApi } from './features/MyTeamMembers/MyTeamMembers.api';
import { invoiceAPI } from './features/my-company-invoice/MyCompanyInvoice.api';
import { myCompanyCampaignAPI } from './features/my-company-campaign/MyCompanyCampaign.api';

// combine all the reducers from the slices
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  header: headerSlice.reducer,
  businessStatus: businessStatusSlice.reducer,
  [loginHistoryAPI.reducerPath]: loginHistoryAPI.reducer,
  [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
  [personalTasksApi.reducerPath]: personalTasksApi.reducer,
  [currentScheduleAPI.reducerPath]: currentScheduleAPI.reducer,
  [leadsAPI.reducerPath]: leadsAPI.reducer,
  [messagesAPI.reducerPath]: messagesAPI.reducer,
  [changePasswordAPI.reducerPath]: changePasswordAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
  [calendarAPI.reducerPath]: calendarAPI.reducer,
  [notificationTaskAPI.reducerPath]: notificationTaskAPI.reducer,
  [mailAPI.reducerPath]: mailAPI.reducer,
  [myCompanyProfileApi.reducerPath]: myCompanyProfileApi.reducer,
  [disputeOptionsAPI.reducerPath]: disputeOptionsAPI.reducer,
  [myTeamMembersApi.reducerPath]: myTeamMembersApi.reducer,
  [invoiceAPI.reducerPath]: invoiceAPI.reducer,
  [myCompanyCampaignAPI.reducerPath]: myCompanyCampaignAPI.reducer
});

export default rootReducer;
