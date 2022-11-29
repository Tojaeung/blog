import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getCategory } from 'apis/category';
import { getPostsInCategory } from 'apis/post';

import BlogPost from 'components/BlogPost';
import BlogCategory from 'components/BlogCategory';
import Pagination from 'components/Pagination';

import * as S from './style';

function Category() {
  const { categoryId } = useParams();

  const [pageNum, setPageNum] = useState(1);
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0

  const { data: selectedCategory } = useQuery(['category'], () => getCategory(Number(categoryId)));
  const { data: page } = useQuery(['postInCategory', categoryId], () =>
    getPostsInCategory(Number(categoryId), pageNum),
  );

  return (
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
  );
}

export default Category;
