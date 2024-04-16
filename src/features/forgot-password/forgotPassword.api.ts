import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type ForgotPassword = {
    email: string;
};

export const forgotPasswordApi = createApi({
    reducerPath: 'ForgotPassword',
    baseQuery,
    tagTypes: ['ForgotPassword'],
    endpoints: (builder) => ({
        forgotPassword: builder.mutation<any, Partial<any>>({
            query: ({
                email,
            }: ForgotPassword) => ({
                url: `${ENDPOINTS.FORGOT_PASSWORD}`,
                method: 'POST',
                body: {
                    email: email
                }
            })
        })
    })
});

export const {
    useForgotPasswordMutation
} = forgotPasswordApi;