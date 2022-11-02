import Link from 'next/link';
import React, { useEffect } from 'react';
import { getCategorys } from 'features/category/categoryThunk';
import { selectCategorys } from 'features/category/categorySlice';
import { CategoryType } from 'features/category/type';
import { useAppDispatch, useAppSelector } from 'hooks/useRtkCustomHook';

import { Category, CategoryBadge, Container } from './style';
import { categorys } from 'constants/practice';

function BlogCategory() {
  const dispatch = useAppDispatch();
  // const categorys = useAppSelector(selectCategorys);

  return (
    <Container>
      {categorys.map((category) => (
        <Link href={`도메인주소/category/${category.name}`} key={category.id}>
          <CategoryBadge>
            <Category>
              {category.name} ({category.postCnt})
            </Category>
          </CategoryBadge>
        </Link>
      ))}
    </Container>
  );
}

export default BlogCategory;
