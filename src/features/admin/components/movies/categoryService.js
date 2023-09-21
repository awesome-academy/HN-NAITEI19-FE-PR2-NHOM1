import { apiService } from '../../../../app/apiService';

export const categoryService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryList: builder.query({
      query: () => 'categories',
    }),
  }),
});

export const { useGetCategoryListQuery } = categoryService;
