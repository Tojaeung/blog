import axios from 'axios';
import { CommentType } from 'interfaces/comment';

export const createComment = async (
  postId: number,
  author: string,
  content: string,
  parentId?: number,
): Promise<CommentType> => {
  if (!parentId) {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/comment`,
      { author, content },
      { withCredentials: true },
    );
    return res.data;
  } else {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/comment/${parentId}`,
      { author, content },
      { withCredentials: true },
    );
    return res.data;
  }
};

export const getComments = async (postId: number) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/comment`, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteComment = async (commentId: number, accessToken: string) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return res.data;
};
