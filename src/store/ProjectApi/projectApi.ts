import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IRepo, IUser, ServerResponse} from '../../models/models';

export const projectApi = createApi({
  reducerPath: 'project/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus: true,//автоматически отправляет запрос при фокусе на страницу
  endpoints: build => ({
    getUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (response: ServerResponse) => response.items
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`
      })
    })
  })
});

export const {useGetUsersQuery, useLazyGetUserReposQuery} = projectApi;