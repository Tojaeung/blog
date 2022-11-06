import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'apps/store';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { CommentType } from './type';
import { selectAuthAccessToken } from 'features/auth/authSlice';
import { ErrorType } from 'interfaces/error';

export const createComment = createAsyncThunk<
  CommentType,
  { postId: number; author: string; content: string; parentId: number },
  { state: RootState; rejectValue: ErrorType }
>('comment/create', async (data, thunkApi) => {
  try {
    const { postId, author, content, parentId } = data;
    const accessToken = useAppSelector(selectAuthAccessToken);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/post/${postId}/comment/${parentId}`,
      { author, content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getComments = createAsyncThunk<
  CommentType[],
  { postId: number },
  { state: RootState; rejectValue: ErrorType }
>('comment/get', async (data, thunkApi) => {
  try {
    const { postId } = data;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comment/${postId}/comment`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deleteComment = createAsyncThunk<
  number,
  { commentId: number },
  { state: RootState; rejectValue: ErrorType }
>('comment/delete', async (data, thunkApi) => {
  const accessToken = useAppSelector(selectAuthAccessToken);
  try {
    const { commentId } = data;
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/comment/${commentId}`, {
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
