import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addPost, deletePost, fetchAllPosts, fetchPost, fetchPostsInCategory, updatePost } from 'apis/post';

const usePostQuery = () => {
  const { invalidateQueries } = useQueryClient();

  const addPostMutation = useMutation({ mutationFn: addPost });

  const fetchAllPostsQuery = (pageNumber: number) => {
    return useQuery({ queryKey: ['allPosts', pageNumber], queryFn: () => fetchAllPosts(pageNumber) });
  };

  const fetchPostsInCategoryQuery = (categoryId: number, pageNumber: number) => {
    return useQuery({
      queryKey: ['postsInCategory', pageNumber],
      queryFn: () => fetchPostsInCategory(categoryId, pageNumber),
    });
  };

  const fetchPostQuery = (postId: number) => {
    return useQuery(['post', postId], () => fetchPost(postId));
  };

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      invalidateQueries({ queryKey: ['post', updatedPost.id] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      invalidateQueries({ queryKey: ['post', deletedId] });
    },
  });

  return {
    addPostMutation,
    fetchAllPostsQuery,
    fetchPostsInCategoryQuery,
    fetchPostQuery,
    updatePostMutation,
    deletePostMutation,
  };
};

export default usePostQuery;
