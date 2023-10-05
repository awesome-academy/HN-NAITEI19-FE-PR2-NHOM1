import { apiService } from '../apiService';

export const showtimeService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getShowtimeDetail: builder.query({
      query: () => 'showTimeDetail',
      providesTags: ['showtime'],
    }),

    fetchShowTime: builder.query({
      query: () => 'showtimes',
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
    getShowtimeById: builder.query({
      query: (showtimeId) =>
        `showtimes/${showtimeId}?_expand=movie&_expand=theater&_expand=cinema&_embed=bookings`,
      providesTags: ['showtime'],
    }),
  }),
});

export const {
  useGetShowtimeDetailQuery,
  useGetShowtimesQuery,
  useAddShowtimeMutation,
  useDeleteShowtimeMutation,
  useUpdateShowtimeMutation,
  useFetchShowTimeQuery,
  useGetShowtimeByIdQuery,
} = showtimeService;
