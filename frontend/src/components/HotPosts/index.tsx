import { useEffect, useState } from 'react';

import TagBadges from 'components/TagBadges';
import Viewer from 'components/Viewer';

import { getTop5 } from 'apis/post';
import { IPost } from 'interfaces/post';

import * as S from './style';

function HotPosts() {
  const [top5, setTop5] = useState<IPost[]>([]);

  useEffect(() => {
    getTop5().then((res) => setTop5(res));
  }, []);

  return (
    <S.PostBox>
      {top5?.map((post) => {
        return (
          <S.PostLink to={`/post/${post.id}`} key={post.id}>
            <S.PostList>
              <S.PostImage src={post.thumbnail} alt='포스팅 썸네일' />
              <S.Title>{post.title}</S.Title>

              <Viewer content={post.content} />

              {post.tags.length !== 0 && <TagBadges tags={post.tags} />}

              <S.Detailed>
                {post.createdAt} | 조회수 {post.views}
              </S.Detailed>
            </S.PostList>
          </S.PostLink>
        );
      })}
    </S.PostBox>
  );
}

export default HotPosts;
