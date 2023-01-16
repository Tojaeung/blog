import { adminApi, clientApi } from 'utils/axios';
import { IComment, INewChildComment, INewComment } from 'interfaces/comment';

export const addComment = async ({ author, content, isAdmin, postId }: INewComment): Promise<IComment> => {
  const { data } = await clientApi.post(`/post/${postId}/comment`, { author, content, isAdmin });
  return data;
};

export const addChildComment = async ({
  author,
  content,
  isAdmin,
  parentId,
  postId,
}: INewChildComment): Promise<IComment> => {
  const { data } = await clientApi.post(`/post/${postId}/comment/${parentId}`, { author, content, isAdmin });
  return data;
};

export const getComments = async (postId: number): Promise<IComment[]> => {
  const { data } = await clientApi.get(`/post/${postId}/comment`);
  return data;
};

export const getRecentComments = async (): Promise<IComment[]> => {
  const { data } = await clientApi.get('/comment/recent');
  return data;
};

export const deleteComment = async (commentId: number): Promise<number> => {
  const { data } = await adminApi.delete(`/comment/${commentId}`);
  return data;
};
