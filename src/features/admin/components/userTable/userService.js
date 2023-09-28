import { apiService } from '../../../../app/apiService';

export const userService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUSers: builder.query({
      query: () => ({
        url: 'users?id_gte=2',
      }),
      providesTags: ['user'],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `users/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetUSersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userService;
