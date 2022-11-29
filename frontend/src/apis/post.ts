import { adminApi, clientApi } from 'utils/axios';
import { IPost } from 'interfaces/post';

export const addPost = (categoryId: number, formData: FormData) => {
  adminApi.post(`/category/${categoryId}/post`, formData).then((res) => res.data);
};

export const getTop5 = async (): Promise<IPost[]> => {
  const res = await clientApi.get('/post/top5').then((res) => res.data);
  return res.data;
};

// 페이지네이션이 있다.
export const getAllPosts = (pageNum: number) => clientApi.get(`/post?page=${pageNum}`).then((res) => res.data);

export const getPostsInCategory = (categoryId: number, pageNum: number) =>
  clientApi.get(`/category/${categoryId}/post?page=${pageNum}`).then((res) => res.data);

export const getPost = async (postId: number): Promise<IPost> => {
  const res = await clientApi.get(`/post/${postId}`);
  return res.data;
};

export const updatePost = (postId: number, formData: FormData) =>
  adminApi.put(`/post/${postId}`, formData).then((res) => res.data);

export const deletePost = async (postId: number): Promise<number> => {
  const res = await adminApi.delete(`/post/${postId}`);
  return res.data;
};
