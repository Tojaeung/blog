import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { getRecentComments } from 'apis/comment';

import * as S from './style';

function RecentComments() {
  const { data: recentComments } = useQuery('recentComments', () => getRecentComments(), {
    staleTime: 0, // 최신정보 받기
  });

  return (
    <S.Container>
      {recentComments?.map((comment) => {
        return (
          <Link to={`/post/${comment.postId}`} key={comment.id}>
            <S.List>
              <S.Comment>{comment.content}</S.Comment>

              <S.UserBox>
                <S.UserIcon />
                <S.User>{comment.author}</S.User>
              </S.UserBox>
            </S.List>
          </Link>
        );
      })}
    </S.Container>
  );
}

export default RecentComments;
