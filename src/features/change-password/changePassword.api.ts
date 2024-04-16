import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type ChangePassword = {
  message: any;
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export const changePasswordAPI = createApi({
  reducerPath: 'changePassword',
  baseQuery,
  tagTypes: ['ChangePassword'],
  endpoints: (builder) => ({
    changePassword: builder.mutation<ChangePassword, Partial<ChangePassword>>({
      query: ({
        old_password,
        new_password,
        confirm_password
      }: ChangePassword) => ({
        url: `${ENDPOINTS.CHANGE_PASSWORD}`,
        method: 'PUT',
        body: {
          old_password: old_password,
          new_password: new_password,
          confirm_password: confirm_password
        }
      })
    })
  })
});

export const { useChangePasswordMutation } = changePasswordAPI;
