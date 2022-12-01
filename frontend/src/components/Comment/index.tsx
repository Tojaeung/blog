import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import Form from './Form';
import ChildrenComment from './ChildrenComment';

import { getComments, deleteComment } from 'apis/comment';

import * as S from './style';

function Comment() {
  const queryCache = useQueryClient();

  const { postId } = useParams();
  const accessToken = localStorage.getItem('accessToken');

  const [reply, setReply] = useState<number>(-1);

  const { data: comments } = useQuery(['comment', postId], () => getComments(Number(postId)));
  const { mutate: deleteCommentMutate } = useMutation(deleteComment, {
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ['comment', postId] });
    },
  });

  const handleDelete = async (commentId: number) => {
    if (!accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      deleteCommentMutate(commentId);
      alert('삭제 되었습니다.');
    } else {
      alert('삭제 되지 않았습니다.');
    }
  };

  return (
    <S.Container>
      <S.Title>댓글 {comments?.length}개</S.Title>

      {comments !== undefined && comments.length > 0 && (
        <S.CommentBox>
          {comments?.map((comment) => (
            <S.CommentList key={comment.id}>
              <S.AuthorBox>
                <S.Author>{!comment.isAdmin ? comment.author : `👑${comment.author}`}</S.Author>
                <S.DateTime>({comment.createdAt})</S.DateTime>
                {accessToken && <S.DeleteButton onClick={() => handleDelete(comment.id)}>삭제</S.DeleteButton>}
              </S.AuthorBox>

              <S.Content>{comment.content}</S.Content>
              <S.ReplyButton onClick={() => setReply(comment.id)}>답글</S.ReplyButton>

              {comment.children.length > 0 && <ChildrenComment childrenComments={comment.children} />}

              {comment.id === reply && <Form parentId={comment.id} />}
            </S.CommentList>
          ))}
        </S.CommentBox>
      )}

      {/* 부모댓글 생성 폼 */}
      {reply === -1 && <Form parentId={undefined} />}
    </S.Container>
  );
}

export default Comment;
