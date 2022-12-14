import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getPostsInTag } from 'apis/tag';

import NotFound from 'pages/NotFound';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';
import MetaTag from 'layouts/MetaTag';

import * as S from './style';

function TagName() {
  const { tagName } = useParams();

  const [pageNum, setPageNum] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  const { data: page } = useQuery(['postsInTag', { tagName, pageNum }], () => getPostsInTag(tagName || '', pageNum));

  if (page?.totalCnt === 0) return <NotFound />;
  else {
    return (
      <>
        <MetaTag
          title={`#${tagName} - 토재웅`}
          desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
          url={`https://tojaeung.com/tag/${tagName}`}
        />

        <S.Container>
          <BlogCategory />

          <S.TitleBox>
            <S.Title>#{tagName}</S.Title>
            <S.PostCntBadge>{page?.totalCnt}</S.PostCntBadge>
          </S.TitleBox>
          <S.Detail>#{tagName} 관련된 포스팅을 모아놓았습니다.</S.Detail>

          <BlogPost posts={page?.posts} />

          <Pagination
            pageNum={pageNum}
            setPageNum={setPageNum}
            blockNum={blockNum}
            setBlockNum={setBlockNum}
            totalCnt={page?.totalCnt}
          />
        </S.Container>
      </>
    );
  }
}

export default TagName;
