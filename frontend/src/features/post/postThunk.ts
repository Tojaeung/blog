import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'apps/store';
import { selectAuthAccessToken } from 'features/auth/authSlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { PostType } from './type';
import { ErrorType } from 'interfaces/error';

export const createPost = createAsyncThunk<
  PostType,
  { categoryId: number; formData: FormData },
  { state: RootState; rejectValue: ErrorType }
>('post/create', async (data, thunkApi) => {
  try {
    const accessToken = useAppSelector(selectAuthAccessToken);
    const { categoryId, formData } = data;
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${categoryId}/post`, formData, {
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

export const getAllPosts = createAsyncThunk<PostType[], void, { state: RootState; rejectValue: ErrorType }>(
  'post/getAllPosts',
  async (data, thunkApi) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const getPostsTop5 = createAsyncThunk<PostType[], void, { state: RootState; rejectValue: ErrorType }>(
  'post/getPostsTop5',
  async (data, thunkApi) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/top5`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

// export const getPostsInCategory = createAsyncThunk<
//   PostType[],
//   { categoryId: number },
//   { state: RootState; rejectValue: ErrorType }
// >('post/getPostsInCategory', async (data, thunkApi) => {
//   try {
//     const { categoryId } = data;
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categoryId}/post`, {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (err: any) {
//     return thunkApi.rejectWithValue(err.response.data);
//   }
// });

// export const getPost = createAsyncThunk<PostType, { postId: number }, { state: RootState; rejectValue: ErrorType }>(
//   'post/getPost',
//   async (data, thunkApi) => {
//     try {
//       const { postId } = data;
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`, {
//         withCredentials: true,
//       });
//       return res.data;
//     } catch (err: any) {
//       return thunkApi.rejectWithValue(err.response.data);
//     }
//   },
// );

export const updatePost = createAsyncThunk<
  PostType,
  { postId: number; formData: FormData },
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

export const deletePost = createAsyncThunk<number, { postId: number }, { state: RootState; rejectValue: ErrorType }>(
  'post/delete',
  async (data, thunkApi) => {
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
  },
);
