import { adminApi, clientApi } from 'utils/axios';
import { IPagePost, IPost } from 'interfaces/post';

export const addPost = async (categoryId: number, formData: FormData): Promise<IPost> => {
  const { data } = await adminApi.post(`/category/${categoryId}/post`, formData);
  return data;
};

export const getTop5 = async (): Promise<IPost[]> => {
  const res = await clientApi.get('/post/top5');
  return res.data;
};

// 페이지네이션이 있다.
export const getAllPosts = async (pageNum: number): Promise<IPagePost> => {
  const { data } = await clientApi.get(`/post?page=${pageNum}`);
  return data;
};

export const getPostsInCategory = async (categoryId: number, pageNum: number): Promise<IPagePost> => {
  const { data } = await clientApi.get(`/category/${categoryId}/post?page=${pageNum}`);
  return data;
};

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
