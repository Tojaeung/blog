import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addCategory, deleteCategory, fetchCategories, updateCategory } from 'apis/category';

const { invalidateQueries } = useQueryClient();

const useCategoryQuery = () => {
  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['category'] });
    },
  });

  const fetchCategoriesQuery = () => {
    return useQuery('category', () => fetchCategories());
  };

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['category'] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['category'] });
    },
  });

  return { addCategoryMutation, fetchCategoriesQuery, updateCategoryMutation, deleteCategoryMutation };
};

export default useCategoryQuery;
