import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const apiService = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_API }),
  tagTypes: [
    'movie',
    'showtime',
    'cinema',
    'user',
    'rate',
    'income',
    'booking',
    'auth',
    'event',
    'seat',
  ],
  endpoints: (builder) => ({}),
});
