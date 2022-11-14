import React from 'react';

import * as S from './style';
import { IProp } from './type';

function ChildrenComment({ children }: IProp) {
  return (
    <S.CommentBox>
      <S.Depth />
      <S.ListBox>
        {children.map((child) => (
          <S.CommentList key={child.id}>
            <S.Author>
              ↳ {child.author} ({child.createdAt})
            </S.Author>
            <S.Content>{child.content}</S.Content>
          </S.CommentList>
        ))}
      </S.ListBox>
    </S.CommentBox>
  );
}

export default ChildrenComment;
