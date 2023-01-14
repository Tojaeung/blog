import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';

import { searchKeyword } from 'apis/search';

import NotFound from 'pages/NotFound';

import BlogCategory from 'components/BlogCategory';
import BlogPost from 'components/BlogPost';
import Pagination from 'components/Pagination';

import * as S from './style';

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const [pageNum, setPageNum] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  const { data: page } = useQuery(['search', { keyword, pageNum }], () => searchKeyword(keyword || '', pageNum));

  if (page?.totalCnt === 0) return <NotFound />;
  else {
    return (
      <>
        <Helmet>
          <title>{`${keyword} 검색결과 - 토재웅`}</title>
        </Helmet>
        <S.Container>
          <BlogCategory />

          <S.TitleBox>
            {page?.totalCnt === 0 ? (
              <S.Title>{keyword} 검색결과가 없습니다.</S.Title>
            ) : (
              <S.Title>{keyword} 검색결과</S.Title>
            )}

            <S.PostCntBadge>{page?.totalCnt}</S.PostCntBadge>
          </S.TitleBox>
          <S.Detail>{keyword} 관련된 포스팅을 모아놓았습니다.</S.Detail>

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

export default Search;
