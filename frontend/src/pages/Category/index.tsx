import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getCategory } from 'apis/category';
import { getPostsInCategory } from 'apis/post';

import BlogPost from 'components/BlogPost';
import BlogCategory from 'components/BlogCategory';
import Pagination from 'components/Pagination';
import MetaTag from 'layouts/MetaTag';

import * as S from './style';

function Category() {
  const { categoryId } = useParams();

  const [pageNum, setPageNum] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  const { data: selectedCategory } = useQuery(['selectedCategory', categoryId], () => getCategory(Number(categoryId)));

  const { data: page } = useQuery(['postInCategory', { categoryId, pageNum }], () =>
    getPostsInCategory(Number(categoryId), pageNum),
  );

  return (
    <>
      <MetaTag
        title={`${selectedCategory?.name} 카테고리 - 토재웅`}
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        image='/images/profile.jpg'
        url={`https://tojaeung.com/category/${selectedCategory?.id}`}
      />
      <S.Container>
        <BlogCategory />
        <S.TitleBox>
          <S.Title>{selectedCategory?.name}</S.Title>
          <S.PostCntBadge>{selectedCategory?.postCnt}</S.PostCntBadge>
        </S.TitleBox>
        <S.Detail>{selectedCategory?.name} 관련된 포스팅을 모아놓았습니다.</S.Detail>
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

export default Category;
