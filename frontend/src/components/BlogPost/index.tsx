import TagBadges from 'components/TagBadges';
import Viewer from 'components/Viewer';

import * as S from './style';
import { IProp } from './type';

function BlogPost({ posts }: IProp) {
  return (
    <S.PostBox>
      {posts?.map((post) => {
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

export default BlogPost;
