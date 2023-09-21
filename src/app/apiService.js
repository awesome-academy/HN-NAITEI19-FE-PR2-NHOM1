import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const apiService = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_API }),
  tagTypes: ['movie', 'showtime'],
  endpoints: (builder) => ({}),
});
