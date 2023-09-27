import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventService = createApi({
  reducerPath: 'eventService',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_API }),
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => ({
        url: 'sales',
      }),
    }),
    getNews: builder.query({
      query: () => ({
        url: 'news',
      }),
    }),
  }),
});

export const { useGetSalesQuery, useGetNewsQuery } = eventService;
