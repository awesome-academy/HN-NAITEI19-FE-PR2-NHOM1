import { apiService } from '../apiService';

export const seatService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getSeats: builder.query({
      query: () => 'seats',
      providesTags: ['seat'],
    }),

    getSeatsByTheaterId: builder.query({
      query: (theaterId) => `seats?theaterId=${theaterId}`,
      providesTags: ['seat'],
    }),
  }),
});

export const { useGetSeatsQuery, useGetSeatsByTheaterIdQuery } = seatService;
