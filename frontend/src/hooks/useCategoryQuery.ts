import { useQuery, useMutation, useQueryClient, UseQueryOptions } from 'react-query';
import { addCategory, deleteCategory, fetchCategories, fetchCategory, updateCategory } from 'apis/category';
import { AxiosError, AxiosResponse } from 'axios';
import { IError } from 'interfaces/error';
import { ICategory } from 'interfaces/category';

const useCategoryQuery = () => {
  const { invalidateQueries } = useQueryClient();

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const fetchCategoriesQuery = (options?: UseQueryOptions<Promise<AxiosResponse<ICategory[]>>, AxiosError<IError>>) => {
    return useQuery('categories', () => fetchCategories(), options);
  };

  const fetchCategoryQuery = (categoryId: number) => {
    return useQuery(['category', categoryId], () => fetchCategory(categoryId));
  };

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    addCategoryMutation,
    fetchCategoriesQuery,
    fetchCategoryQuery,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
};

export default useCategoryQuery;
