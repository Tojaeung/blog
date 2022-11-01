import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'apps/store';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import {
  createPostReturnType,
  createPostParamType,
  deleteCategoryParamType,
  deleteCategoryReturnType,
  getCategorysReturnType,
  updateCategoryParamType,
  updateCategoryReturnType,
} from './type';
import { selectAuthAccessToken } from 'features/auth/authSlice';

export const createPost = createAsyncThunk<
  createPostReturnType,
  createPostParamType,
  { state: RootState; rejectValue: { msg: string } }
>('post/create', async (data, thunkApi) => {
  try {
    const { category, formData } = data;
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${category}/post`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getPost = createAsyncThunk<
  getCategorysReturnType,
  void,
  { state: RootState; rejectValue: { msg: string } }
>('post/get', async (data, thunkApi) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updatePost = createAsyncThunk<
  updateCategoryReturnType,
  updateCategoryParamType,
  { state: RootState; rejectValue: { msg: string } }
>('post/update', async (data, thunkApi) => {
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

export const deletePost = createAsyncThunk<
  deleteCategoryReturnType,
  deleteCategoryParamType,
  { state: RootState; rejectValue: { msg: string } }
>('post/delete', async (data, thunkApi) => {
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
