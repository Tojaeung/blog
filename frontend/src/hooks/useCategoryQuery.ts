import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addCategory, deleteCategory, fetchCategories, updateCategory } from 'apis/category';
import { CategoryType } from 'interfaces/category';

const { setQueryData } = useQueryClient();

export const useAddCategory = (newCategoryName: string) => {
  return useMutation('category', () => addCategory(newCategoryName), {
    onSuccess: (newCategpry) => {
      setQueryData<CategoryType[]>('category', (prev) => {
        if (!prev) return [];

        return prev.concat(newCategpry);
      });
    },
  });
};

export const useFetchCategories = () => {
  return useQuery('category', () => fetchCategories());
};

export const useUpdateCategory = (categoryId: number, updatedName: string) => {
  return useMutation('category', () => updateCategory(categoryId, updatedName), {
    onSuccess: (updatedCategpry) => {
      setQueryData<CategoryType[]>('category', (prev) => {
        if (!prev) return [];

        const idx = prev.findIndex((category) => category.id === updatedCategpry.id);
        return prev.splice(idx, 1, updatedCategpry);
      });
    },
  });
};

export const useDeleteCategory = (categoryId: number) => {
  return useMutation('category', () => deleteCategory(categoryId), {
    onSuccess: (deletedId) => {
      setQueryData<CategoryType[]>('category', (prev) => {
        if (!prev) return [];

        const idx = prev.findIndex((category) => category.id === deletedId);
        return prev.splice(idx, 1);
      });
    },
  });
};
