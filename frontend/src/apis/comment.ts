import { adminApi, clientApi } from 'utils/axios';
import { IComment, INewChildComment, INewComment } from 'interfaces/comment';

export const addComment = async (newComment: INewComment): Promise<IComment> => {
  const { author, content, postId } = newComment;
  const { data } = await clientApi.post(`/post/${postId}/comment`, { author, content });
  return data;
};

export const addChildComment = async (newChildComment: INewChildComment): Promise<IComment> => {
  const { author, content, parentId, postId } = newChildComment;
  const { data } = await clientApi.post(`/post/${postId}/comment/${parentId}`, { author, content });
  return data;
};

export const fetchComments = async (postId: number): Promise<IComment[]> => {
  const { data } = await clientApi.get(`/post/${postId}/comment`);
  return data;
};

export const deleteComment = async (commentId: number): Promise<number> => {
  const { data } = await adminApi.delete(`/comment/${commentId}`);
  return data;
};
