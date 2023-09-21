import { apiService } from '../../app/apiService';

export const showtimeService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getShowtimeDetail: builder.query({
      query: () => 'showTimeDetail',
      providesTags: ['showtime'],
    }),
  }),
});

export const { useGetShowtimeDetailQuery } = showtimeService;
