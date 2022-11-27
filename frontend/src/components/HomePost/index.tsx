import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchTop5 } from 'apis/post';

import Viewer from 'components/Viewer';

import { IPost } from 'interfaces/post';

import * as S from './style';

function HomePost() {
  const [top5, setTop5] = useState<IPost[]>([]);

  useEffect(() => {
    fetchTop5().then((res) => setTop5(res));
  }, []);

  return (
    <S.PostBox>
      {top5?.map((post) => {
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
