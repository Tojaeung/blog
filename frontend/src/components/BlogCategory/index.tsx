import Link from 'next/link';
import React, { useEffect } from 'react';
import { getCategorys } from 'features/category/categoryThunk';
import { useAppDispatch, useAppSelector } from 'hooks/useRtkCustomHook';
import { selectCategorys } from 'features/category/categorySlice';
import { CategoryType } from 'features/category/type';

import { Category, CategoryBadge, Container } from './style';

const categorys: CategoryType[] = [
  { id: 1, name: '스프링', postCnt: 5 },
  { id: 2, name: '데이터', postCnt: 2 },
  { id: 3, name: '나다', postCnt: 2 },
  { id: 4, name: '알고리즘', postCnt: 5 },
];

function BlogCategory() {
  const dispatch = useAppDispatch();
  // const categorys = useAppSelector(selectCategorys);

  useEffect(() => {
    try {
      dispatch(getCategorys());
    } catch (e) {}
  }, []);

  return (
    <Container>
      {categorys.map((category) => (
        <Link href={`도메인주소/category/${category.name}`}>
          <CategoryBadge key={category.id}>
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
