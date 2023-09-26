import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const showtimeService = createApi({
  reducerPath: "ShowtimeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_API }),
  endpoints: (builder) => ({
    getShowtimeDetail: builder.query({
      query: () => "showtimeDetail",
    }),
  }),
});

export const { useGetShowtimeDetailQuery } = showtimeService;
