import axios from 'axios';
import { CategoryType } from 'interfaces/category';

export const createCategory = async (newCategoryName: string, accessToken: string): Promise<CategoryType> => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/category`,
    { name: newCategoryName },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  );
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
    withCredentials: true,
  });

  return res.data;
};

export const updateCategory = async (
  categoryId: number,
  updatedName: string,
  accessToken: string,
): Promise<CategoryType> => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/category/${categoryId}`,
    { updatedName },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  );
  return res.data;
};

export const deleteCategory = async (categoryId: number, accessToken: string): Promise<number> => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res.data;
};
