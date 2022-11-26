import { adminApi, clientApi } from 'utils/axios';
import { CategoryType } from 'interfaces/category';

export const addCategory = async (newCategoryName: string): Promise<CategoryType> => {
  const { data } = await adminApi.post('/category', { name: newCategoryName });
  return data;
};

export const fetchCategories = async (): Promise<CategoryType[]> => {
  const { data } = await clientApi.get('/category');
  return data;
};

export const updateCategory = async (categoryId: number, updatedName: string): Promise<CategoryType> => {
  const { data } = await adminApi.put(`/category/${categoryId}`, { updatedName });
  return data;
};

export const deleteCategory = async (categoryId: number): Promise<number> => {
  const { data } = await adminApi.delete(`/category/${categoryId}`);
  return data;
};
