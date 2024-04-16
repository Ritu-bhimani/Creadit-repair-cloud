import { createApi } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../services';
import { baseQuery } from '../../services/baseQuery';

export type ProfileDetails = {
    company_name: string;
    website: string;
    time_zone: string;
    address: string;
    city: string;
    state: string;
    zip_code: number;
    country_name: string
    phone: number;
    fax: number;
    invoices_payable_to: string;
}
export type SendDetails = {
    sender_name: string
    sender_email: string
}
export type MyCompanyProfileData = {
    id: any;
    profile_details: ProfileDetails;
    sender_details: SendDetails;
    message: any

}
export const myCompanyProfileApi = createApi({
    reducerPath: 'myCompanyProfile',
    baseQuery,
    tagTypes: ['MyCompanyProfile'],
    endpoints: (builder) => ({
        getMyCompanyProfileData: builder.query<MyCompanyProfileData, Partial<MyCompanyProfileData>>({
            query: ({ id }: MyCompanyProfileData) => ({
                url: `${ENDPOINTS.PROFILE}/${id}`,
                method: 'GET'
            })
        }),
        getTimeZones: builder.query({
            query: (args) => `${ENDPOINTS.TIMEZONES}`
        }),
        getStates: builder.query({
            query: (args) => `${ENDPOINTS.STATES}`
        }),
        updateCompanyProfile: builder.mutation<MyCompanyProfileData, Partial<MyCompanyProfileData>>({
            query: (arg: MyCompanyProfileData) => ({
                url: `${ENDPOINTS.PROFILE}/${arg.id}`,
                method: 'PUT',
                body: arg
            })
        }),
    })
})

export const {
    useGetMyCompanyProfileDataQuery,
    useGetTimeZonesQuery,
    useUpdateCompanyProfileMutation,
    useGetStatesQuery
} = myCompanyProfileApi;