import BlogCategory from 'components/BlogCategory';
import Posting from 'components/Posting';
import Comment from 'components/Comment';

import * as S from './style';

function Post() {
  return (
    <S.Container>
      <BlogCategory />
      <Posting />
      <Comment />
    </S.Container>
  );
}

export default Post;
