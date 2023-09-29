import { apiService } from '../apiService';

export const movieService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({
        url: 'movies',
        method: 'GET',
      }),
      providesTags: ['movie'],
    }),
    fetchMovie: builder.query({
      query: (movieId) => `movies/${movieId}`,
      providesTags: ['movie'],
    }),
    updateMovie: builder.mutation({
      query: (data) => ({
        url: `movies/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['movie'],
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `movies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['movie'],
    }),
    createMovie: builder.mutation({
      query: (data) => ({
        url: 'movies',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['movie'],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useFetchMovieQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useCreateMovieMutation,
} = movieService;
