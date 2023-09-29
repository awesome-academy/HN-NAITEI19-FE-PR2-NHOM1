import { apiService } from '../../app/apiService';

export const cinemaService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getCinema: builder.query({
      query: (data) => ({
        url: `cinemas?name=${data}`,
      }),
    }),
    getAllCinemas: builder.query({
      query: () => ({
        url: 'cinemas?_embed=theaters',
        method: 'GET',
      }),
      providesTags: ['cinema'],
    }),
  }),
});

export const { useGetCinemaQuery, useGetAllCinemasQuery } = cinemaService;
