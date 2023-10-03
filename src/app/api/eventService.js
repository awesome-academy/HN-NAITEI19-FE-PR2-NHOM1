import { apiService } from '../apiService';

export const eventService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => ({
        url: 'sales',
      }),
      providesTags: ['event'],
    }),
    getNews: builder.query({
      query: () => ({
        url: 'news',
      }),
      providesTags: ['event'],
    }),
  }),
});

export const { useGetSalesQuery, useGetNewsQuery } = eventService;
