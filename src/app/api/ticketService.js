import { apiService } from '../apiService';

const ticketService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => '/bookings?_expand=user&_expand=movie&_expand=showtime',
      providesTags: ['booking'],
    }),
    updateTicket: builder.mutation({
      query: (data) => ({
        url: `/bookings/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['booking', 'income'],
    }),
    createTicket: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['booking', 'income', 'showtime'],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useUpdateTicketMutation,
  useCreateTicketMutation,
} = ticketService;
