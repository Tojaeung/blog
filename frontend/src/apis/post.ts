import { adminApi, clientApi } from 'utils/axios';
import { IPost, INewPost, IPagePost, IUpdatedPost } from 'interfaces/post';

export const addPost = async (newPost: INewPost): Promise<IPost> => {
  const { categoryId, formData } = newPost;

  const { data } = await adminApi.post(`/category/${categoryId}/post`, formData);
  return data;
};

export const fetchTop5 = async (): Promise<IPost[]> => {
  const { data } = await clientApi.get('/post/top5');
  return data;
};

// 페이지네이션이 있다.
export const fetchAllPosts = async (pageNumber: number): Promise<IPagePost> => {
  const { data } = await clientApi.get(`/post?page=${pageNumber}`);
  return data;
};

export const fetchPostsInCategory = async (categoryId: number, pageNumber: number): Promise<IPagePost> => {
  const { data } = await clientApi.get(`/category/${categoryId}/post?page=${pageNumber}`);
  return data;
};

export const fetchPost = async (postId: number) => {
  const { data } = await clientApi.get(`/post/${postId}`);
  return data;
};

export const updatePost = async (updatedPost: IUpdatedPost): Promise<IPost> => {
  const { formData, postId } = updatedPost;
  const { data } = await adminApi.put(`/post/${postId}`, formData);
  return data;
};

export const deletePost = async (postId: number): Promise<number> => {
  const { data } = await adminApi.delete(`/post/${postId}`);
  return data;
};
