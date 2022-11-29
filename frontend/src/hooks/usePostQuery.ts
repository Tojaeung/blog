import { AxiosResponse, AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addPost, deletePost, fetchAllPosts, fetchPost, fetchPostsInCategory, updatePost } from 'apis/post';
import { IPagePost, IPost } from 'interfaces/post';
import { IError } from 'interfaces/error';

const usePostQuery = () => {
  const { invalidateQueries } = useQueryClient();

  const addPostMutation = useMutation({ mutationFn: addPost });

  interface IProp {
    pageNum: number;
  }

  const fetchAllPostsQuery = ({ pageNum }: IProp) =>
    useQuery<AxiosResponse<IPagePost>, AxiosError<IError>>(['allPosts', pageNum], () => fetchAllPosts({ pageNum }));

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
