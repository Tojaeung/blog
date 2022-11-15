import axios from 'axios';
import { PagePostType, PostType } from 'interfaces/post';

export const createPost = async (categoryId: number, formData: FormData, accessToken: string): Promise<PostType> => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${categoryId}/post`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // 'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });

  return res.data;
};

export const getPostsTop5 = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/top5`, {
    withCredentials: true,
  });

  return res.data;
};

// 페이지네이션이 있다.
export const getAllPosts = async (pageNumber: number): Promise<PagePostType> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post?page=${pageNumber}`, {
    withCredentials: true,
  });
  return res.data;
};

export const getPostsInCategory = async (categoryId: number, pageNumber: number): Promise<PagePostType> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categoryId}/post?page=${pageNumber}`, {
    withCredentials: true,
  });
  return res.data;
};

export const getPost = async (postId: number) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const updatePost = async (postId: number, formData: FormData, accessToken: string) => {
  const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/post/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res.data;
};

export const deletePost = async (postId: number, accessToken: string) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return res.data;
};
