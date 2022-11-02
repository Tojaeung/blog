import Link from 'next/link';
import React from 'react';
import { selectCategorys } from 'features/category/categorySlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';

import { Category, CategoryBadge } from './style';
import { categorys } from 'constants/practice';

function BlogCategory() {
  // const categorys = useAppSelector(selectCategorys);

  return (
    <CategoryBadge>
      {categorys.map((category) => (
        <Link href={`도메인주소/category/${category.name}`} key={category.id}>
          <Category>
            {category.name} ({category.postCnt})
          </Category>
        </Link>
      ))}
    </CategoryBadge>
  );
}

export default BlogCategory;
