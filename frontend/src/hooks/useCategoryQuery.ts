import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addCategory, deleteCategory, fetchCategories, fetchCategory, updateCategory } from 'apis/category';

const { invalidateQueries } = useQueryClient();

const useCategoryQuery = () => {
  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const fetchCategoriesQuery = () => {
    return useQuery('categories', () => fetchCategories());
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
