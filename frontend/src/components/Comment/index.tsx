import React, { useState } from 'react';

import Form from './Form';
import ChildrenComment from './ChildrenComment';

import * as S from './style';
import { IProps } from './type';
import { CommentType } from 'interfaces/comment';
import { deleteComment } from 'apis/comment';

function Comment({ auth, comments }: IProps) {
  const [commentsState, setComments] = useState<CommentType[]>(comments);
  const [reply, setReply] = useState<number>(-1);

  const handleDeleteComment = async (commentId: number) => {
    if (!auth?.accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      const deletedId = await deleteComment(commentId, auth.accessToken);
      alert('삭제 되었습니다.');
      setComments([...commentsState.filter((comment) => comment.id !== deletedId)]);
    } else {
      alert('삭제 되지 않았습니다.');
    }
  };

  return (
    <S.Container>
      <S.Title>댓글 {commentsState.length}개</S.Title>
      {commentsState.length > 0 && (
        <S.CommentBox>
          {commentsState.map((comment) => (
            <S.CommentList key={comment.id}>
              <S.AuthorBox>
                <S.Author>{!comment.isAdmin ? comment.author : `👑${comment.author}`}</S.Author>
                <S.DateTime>({comment.createdAt})</S.DateTime>
                {auth?.accessToken && (
                  <S.DeleteButton onClick={(e) => handleDeleteComment(comment.id)}>삭제</S.DeleteButton>
                )}
              </S.AuthorBox>

              <S.Content>{comment.content}</S.Content>
              <S.ReplyButton onClick={(e) => setReply(comment.id)}>답글</S.ReplyButton>

              {comment.children.length > 0 && <ChildrenComment children={comment.children} />}

              {comment.id === reply && (
                <Form commentsState={commentsState} setComments={setComments} parentId={comment.id} />
              )}
            </S.CommentList>
          ))}
        </S.CommentBox>
      )}

      {/* 부모댓글 생성 폼 */}
      {reply === -1 && <Form commentsState={commentsState} setComments={setComments} parentId={undefined} />}
    </S.Container>
  );
}

export default Comment;
