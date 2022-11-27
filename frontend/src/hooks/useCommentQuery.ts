import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addComment, addChildComment, fetchComments, deleteComment } from 'apis/comment';

const { invalidateQueries } = useQueryClient();

const useCommentQuery = () => {
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

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedId) => {
      invalidateQueries({ queryKey: ['comment'] });
    },
  });

  return { addCommentMutation, addChildCommentMutation, fetchCommentsQuery, deleteCommentMutation };
};

export default useCommentQuery;
