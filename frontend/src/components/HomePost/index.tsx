import { Link } from 'react-router-dom';

import Viewer from 'components/Viewer';

import * as S from './style';
import { IProp } from './type';

function HomePost({ postsTop5 }: IProp) {
  return (
    <S.PostBox>
      {postsTop5?.map((post) => {
        return (
          <Link to={`/post/${post.id}`} key={post.id}>
            <S.PostList>
              <S.ImageBox>
                <img src={post.thumbnail} alt='포스팅 썸네일' />
              </S.ImageBox>
              <S.TextBox>
                <S.Title>{post.title}</S.Title>

                <Viewer content={post.content} />

                <S.Detailed>
                  {post.createdAt} | 조회수 {post.views}
                </S.Detailed>
              </S.TextBox>
            </S.PostList>
          </Link>
        );
      })}
    </S.PostBox>
  );
}

export default HomePost;
