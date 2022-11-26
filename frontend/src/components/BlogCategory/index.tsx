import React from 'react';
import { Link, useParams } from 'react-router-dom';

import * as S from './style';
import { IProp } from './type';

function BlogCategory({ categories }: IProp) {
  // const {} = useParams()

  return (
    <S.Container>
      {categories.map((category) => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <S.Badge currentPage={category.id === Number(router.query.id)}>
            {category.name} ({category.postCnt})
          </S.Badge>
        </Link>
      ))}
    </S.Container>
  );
}

export default BlogCategory;
