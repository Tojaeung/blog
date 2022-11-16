import React, { useState } from 'react';

import Form from './Form';
import ChildrenComment from './ChildrenComment';

import * as S from './style';
import { IProp } from './type';
import { CommentType } from 'interfaces/comment';

function Comment({ comments }: IProp) {
  const [commentsState, setComments] = useState<CommentType[]>(comments);
  const [reply, setReply] = useState<number>(-1);

  return (
    <S.Container>
      <S.Title>댓글 {commentsState.length}개</S.Title>
      {commentsState.length && (
        <S.CommentBox>
          {commentsState.map((comment) => (
            <S.CommentList key={comment.id}>
              <S.AuthorBox>
                <S.Author>{comment.author}</S.Author>
                <S.DateTime>({comment.createdAt})</S.DateTime>
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
