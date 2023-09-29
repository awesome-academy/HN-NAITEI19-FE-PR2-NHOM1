import { apiService } from '../../app/apiService';

export const cinemaService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getCinema: builder.query({
      query: (data) => ({
        url: `cinemas?name=${data}`,
      }),
    }),
  }),
});

export const { useGetCinemaQuery } = cinemaService;
