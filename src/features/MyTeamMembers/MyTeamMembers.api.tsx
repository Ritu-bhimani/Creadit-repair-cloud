import { createApi } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../services';
import { baseQuery } from '../../services/baseQuery';

export type AddTeamMemberType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  portalTitle: string;
  role: string;
  userName: string;
  password: string;
  phone: string;
  mobile: string;
  fax: string;
  address: string;
  photo: any;
  sendLoginInformation: boolean;
  systemGeneratedPassword: boolean;
  phone_ext: string;
  message: string;
};
type SelectedUser = {
  message: string;
  id: number;
};
export const myTeamMembersApi = createApi({
  reducerPath: 'myTeamMembers',
  baseQuery,
  tagTypes: ['MyTeamMembers'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => `${ENDPOINTS.TEAM_MEMBERS}`
    }),
    getRoles: builder.query({
      query: (args) => `${ENDPOINTS.ROLES}`
    }),
    addNewTeamMember: builder.mutation<
      AddTeamMemberType,
      Partial<AddTeamMemberType>
    >({
      query: (arg: AddTeamMemberType) => ({
        url: `${ENDPOINTS.TEAM_MEMBERS}`,
        method: 'POST',
        body: arg
      })
    }),
    deleteUser: builder.mutation<SelectedUser, Partial<SelectedUser>>({
      query: ({ id }: SelectedUser) => ({
        url: `${ENDPOINTS.TEAM_MEMBERS}/${id}`,
        method: 'DELETE'
      })
    }),
  })
});
export const {
  useGetUsersQuery,
  useGetRolesQuery,
  useAddNewTeamMemberMutation,
  useDeleteUserMutation,
} = myTeamMembersApi;
