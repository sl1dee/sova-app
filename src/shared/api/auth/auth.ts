import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPersonResponse } from '@shared/api/auth/auth.types.ts';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakerapi.it/api/v2/' }),
  endpoints: (builder) => ({
    getPersons: builder.query<IPersonResponse, number>({
      query: (quantity = 20) => `persons?_quantity=${quantity}`,
    }),
  }),
});

export const { useGetPersonsQuery } = authApi;
