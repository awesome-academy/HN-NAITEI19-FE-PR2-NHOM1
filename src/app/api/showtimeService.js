import { apiService } from '../apiService';

export const showtimeService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getShowtimeDetail: builder.query({
      query: () => 'showTimeDetail',
      providesTags: ['showtime'],
    }),
    getShowtimes: builder.query({
      query: () => 'showtimes?_expand=movie&_expand=theater&_expand=cinema',
      providesTags: ['showtime'],
    }),
    addShowtime: builder.mutation({
      query: (data) => ({
        url: 'showtimes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['showtime'],
    }),
    deleteShowtime: builder.mutation({
      query: (id) => ({
        url: `showtimes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['showtime'],
    }),
    updateShowtime: builder.mutation({
      query: (data) => ({
        url: `showtimes/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['showtime'],
    }),
  }),
});

export const {
  useGetShowtimeDetailQuery,
  useGetShowtimesQuery,
  useAddShowtimeMutation,
  useDeleteShowtimeMutation,
  useUpdateShowtimeMutation,
} = showtimeService;
