import { apiService } from '../../../../app/apiService';

const ticketService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => '/bookings?_expand=user&_expand=movie&_expand=showtime',
      providesTags: ['booking'],
    }),
  }),
});

export const { useGetTicketsQuery } = ticketService;
