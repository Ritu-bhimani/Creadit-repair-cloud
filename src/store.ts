import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { loginHistoryAPI } from './features';
import { calendarAPI } from './features/calendar';
import { changePasswordAPI } from './features/change-password/changePassword.api';
import { forgotPasswordApi } from './features/forgot-password/forgotPassword.api';
import { currentScheduleAPI } from './features/current-schedule/currentSchedule.api';
import { mailAPI } from './features/email/mail.api';
import { leadsAPI } from './features/leads';
import { messagesAPI } from './features/messages';
import { notificationTaskAPI } from './features/notification-task';
import { personalTasksApi } from './features/personal-tasks/personalTasks.api';
import { tasksAPI } from './features/tasks/tasks.api';
import rootReducer from './rootReducer';
import { myCompanyProfileApi } from './features/my-company-profile/MyCompanyProfile.api';
import { disputeOptionsAPI } from './features/dispute-options/disputeOptions.api';
import { myTeamMembersApi } from './features/MyTeamMembers/MyTeamMembers.api';
import { invoiceAPI } from './features/my-company-invoice/MyCompanyInvoice.api';
import { myCompanyCampaignAPI } from './features/my-company-campaign/MyCompanyCampaign.api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    loginHistoryAPI.middleware,
    personalTasksApi.middleware,
    currentScheduleAPI.middleware,
    leadsAPI.middleware,
    messagesAPI.middleware,
    changePasswordAPI.middleware,
    tasksAPI.middleware,
    calendarAPI.middleware,
    notificationTaskAPI.middleware,
    mailAPI.middleware,
    forgotPasswordApi.middleware,
    myCompanyProfileApi.middleware,
    disputeOptionsAPI.middleware,
    myTeamMembersApi.middleware,
    invoiceAPI.middleware,
    myCompanyCampaignAPI.middleware
  ]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

// added any for now inorder to get rid of the error
//see https://github.com/reduxjs/redux-toolkit/pull/329
export type AppDispatch = typeof store.dispatch<any>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
