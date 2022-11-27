import * as S from './style';
import { IProp } from './type';

function ChildrenComment({ childrenComments }: IProp) {
  return (
    <S.CommentBox>
      <S.Depth />
      <S.ListBox>
        {childrenComments.map((child) => (
          <S.CommentList key={child.id}>
            <S.AuthorBox>
              <S.Author>↳{!child.isAdmin ? child.author : `👑${child.author}`}</S.Author>
              <S.DateTime>({child.createdAt})</S.DateTime>
            </S.AuthorBox>
            <S.Content>{child.content}</S.Content>
          </S.CommentList>
        ))}
      </S.ListBox>
    </S.CommentBox>
  );
}

export default ChildrenComment;
