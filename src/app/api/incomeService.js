import { apiService } from '../apiService';

const configService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getIncomeByMonth: builder.query({
      query: () => '/income/months',
      providesTags: ['income'],
    }),

    getIncomeToday: builder.query({
      query: () => '/income/today',
      providesTags: ['income'],
    }),
  }),
});

export const { useGetIncomeByMonthQuery, useGetIncomeTodayQuery } =
  configService;
