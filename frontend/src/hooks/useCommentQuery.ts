import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addComment, addChildComment, fetchComments, deleteComment } from 'apis/comment';

const useCommentQuery = () => {
  const { invalidateQueries } = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      invalidateQueries({ queryKey: ['comment', newComment.postId] });
    },
  });

  const addChildCommentMutation = useMutation({
    mutationFn: addChildComment,
    onSuccess: (newChildComment) => {
      invalidateQueries({ queryKey: ['comment', newChildComment.postId] });
    },
  });

  const fetchCommentsQuery = (postId: number) => {
    return useQuery({ queryKey: ['comment', postId], queryFn: () => fetchComments(postId) });
  };

  const deleteCommentMutation = (postId: number) => {
    return useMutation({
      mutationFn: deleteComment,
      onSuccess: () => {
        invalidateQueries({ queryKey: ['comment', postId] });
      },
    });
  };

  return { addCommentMutation, addChildCommentMutation, fetchCommentsQuery, deleteCommentMutation };
};

export default useCommentQuery;
