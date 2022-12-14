import { adminApi, clientApi } from 'utils/axios';
import { ICategory, IUpdateCategory } from 'interfaces/category';

export const addCategory = async (newCategoryName: string): Promise<ICategory> => {
  const { data } = await adminApi.post('/category', { name: newCategoryName });
  return data;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await clientApi.get('/category');
  return data;
};

export const getCategory = async (categoryId: number): Promise<ICategory> => {
  const { data } = await clientApi.get(`/category/${categoryId}`);
  return data;
};

export const updateCategory = async ({ categoryId, updatedName }: IUpdateCategory): Promise<ICategory> => {
  const { data } = await adminApi.put(`/category/${categoryId}`, { updatedName });
  return data;
};

export const deleteCategory = async (categoryId: number): Promise<number> => {
  const { data } = await adminApi.delete(`/category/${categoryId}`);
  return data;
};
