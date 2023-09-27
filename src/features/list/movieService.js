import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieService = createApi({
  reducerPath: 'MovieApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_API }),
  endpoints: (builder) => ({
    fetchMovie: builder.query({
      query: (movieId) => `movies/${movieId}`,
    }),
  }),
});

export const { useFetchMovieQuery } = movieService;
