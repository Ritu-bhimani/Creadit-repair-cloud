import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, ENDPOINTS } from '../../services';

type team_list ={
    date: string;
    first_name: string;
    gender: string;
    id: number;
    last_name: string;
    photo: string;
    role_name: string;
    status: string;
    user_id: number;
}

type TeamDetails = {
  type: string
  team_list: team_list[];
}

export const usersAPI = createApi({
  reducerPath: 'users',
  baseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getTeamMember: builder.query<TeamDetails, Partial<TeamDetails>>({
        query: ({ type }: TeamDetails) => ({
          url: `${ENDPOINTS.USERS}?type=${type}`,
          method: 'GET'
        })
      }),
  })
});

export const { 
  useGetTeamMemberQuery, 
} = usersAPI;
