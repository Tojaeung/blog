import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addPost, deletePost, fetchAllPosts, fetchPost, fetchPostsInCategory, fetchTop5, updatePost } from 'apis/post';
import { PostType } from 'interfaces/post';

const { setQueryData, invalidateQueries } = useQueryClient();

export const useAddPost = (categoryId: number, formData: FormData) => {
  return useMutation('post', () => addPost(categoryId, formData), {
    onSuccess: (newPost) => {
      setQueryData<PostType>(['post', newPost.id], newPost);
    },
  });
};

export const useFetchTop5 = () => {
  return useQuery('Top5', () => fetchTop5(), { refetchOnMount: 'always' });
};

export const useFetchAllPosts = (pageNumber: number) => {
  return useQuery(['allPosts', pageNumber], () => fetchAllPosts(pageNumber));
};

export const useFetchPostsInCategory = (categoryId: number, pageNumber: number) => {
  return useQuery(['postsInCategory', pageNumber], () => fetchPostsInCategory(categoryId, pageNumber));
};

export const useFetchPost = (postId: number) => {
  return useQuery(['post', postId], () => fetchPost(postId));
};

export const useUpdatePost = (postId: number, formData: FormData) => {
  return useMutation('post', () => updatePost(postId, formData), {
    onSuccess: (updatedPost) => {
      setQueryData<PostType>(['post', updatedPost.id], updatedPost);
    },
  });
};

export const useDeletePost = (postId: number) => {
  return useMutation('post', () => deletePost(postId), {
    onSuccess: (deletedId) => {
      invalidateQueries(['post', deletedId]);
    },
  });
};
