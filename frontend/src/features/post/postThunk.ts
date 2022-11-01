import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'apps/store';
import { selectAuthAccessToken } from 'features/auth/authSlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import {
  createPostReturnType,
  createPostParamType,
  getPostsReturnType,
  getPostsParamType,
  getPostParamType,
  getPostReturnType,
  updatePostParamType,
  updatePostReturnType,
  deletePostReturnType,
  deletePostParamType,
} from './type';
import { ErrorType } from 'interfaces/error';

export const createPost = createAsyncThunk<
  createPostReturnType,
  createPostParamType,
  { state: RootState; rejectValue: ErrorType }
>('post/create', async (data, thunkApi) => {
  try {
    const accessToken = useAppSelector(selectAuthAccessToken);
    const { category, formData } = data;
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${category}/post`, formData, {
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

export const getPosts = createAsyncThunk<
  getPostsReturnType,
  getPostsParamType,
  { state: RootState; rejectValue: ErrorType }
>('post/getAll', async (data, thunkApi) => {
  try {
    const { category } = data;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${category}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getPost = createAsyncThunk<
  getPostReturnType,
  getPostParamType,
  { state: RootState; rejectValue: ErrorType }
>('post/getOne', async (data, thunkApi) => {
  try {
    const { postId } = data;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updatePost = createAsyncThunk<
  updatePostReturnType,
  updatePostParamType,
  { state: RootState; rejectValue: ErrorType }
>('post/update', async (data, thunkApi) => {
  const accessToken = useAppSelector(selectAuthAccessToken);
  try {
    const { postId, formData } = data;
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/post/${postId}`, formData, {
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
  deletePostReturnType,
  deletePostParamType,
  { state: RootState; rejectValue: ErrorType }
>('post/delete', async (data, thunkApi) => {
  const accessToken = useAppSelector(selectAuthAccessToken);
  try {
    const { postId } = data;
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/post/${postId}`, {
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
