import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'apps/store';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import {
  createCategoryParamType,
  createCategoryReturnType,
  deleteCategoryParamType,
  deleteCategoryReturnType,
  getCategorysReturnType,
  updateCategoryParamType,
  updateCategoryReturnType,
} from './type';
import { selectAuthAccessToken } from 'features/auth/authSlice';
import { ErrorType } from 'interfaces/error';

export const createCategory = createAsyncThunk<
  createCategoryReturnType,
  createCategoryParamType,
  { state: RootState; rejectValue: ErrorType }
>('category/create', async (data, thunkApi) => {
  try {
    const accessToken = useAppSelector(selectAuthAccessToken);
    const res = await axios.post('/admin/category', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getCategorys = createAsyncThunk<
  getCategorysReturnType,
  void,
  { state: RootState; rejectValue: ErrorType }
>('category/get', async (data, thunkApi) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateCategory = createAsyncThunk<
  updateCategoryReturnType,
  updateCategoryParamType,
  { state: RootState; rejectValue: ErrorType }
>('category/update', async (data, thunkApi) => {
  const accessToken = useAppSelector(selectAuthAccessToken);
  try {
    const { categoryId, updatedName } = data;
    const res = await axios.patch(`/admin/category/${categoryId}`, updatedName, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deleteCategory = createAsyncThunk<
  deleteCategoryReturnType,
  deleteCategoryParamType,
  { state: RootState; rejectValue: ErrorType }
>('category/delete', async (data, thunkApi) => {
  const accessToken = useAppSelector(selectAuthAccessToken);
  try {
    const { categoryId } = data;
    const res = await axios.delete(`/admin/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
