import { apiService } from '../apiService';

export const RateService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMovieRates: builder.query({
      query: (id) => `rates?movieId=${id}`,
      providesTags: ['rate'],
    }),

    getUserRates: builder.query({
      query: (id) => `rates?userId=${id}&_expand=movie`,
      providesTags: ['rate'],
    }),

    newRate: builder.mutation({
      query: (data) => ({
        url: 'rates',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['rate'],
    }),

    updateRate: builder.mutation({
      query: (data) => ({
        url: `rates/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['rate'],
    }),
  }),
});

export const {
  useNewRateMutation,
  useUpdateRateMutation,
  useGetMovieRatesQuery,
  useGetUserRatesQuery,
} = RateService;
