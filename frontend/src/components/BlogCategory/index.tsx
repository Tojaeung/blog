import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { selectCategorys } from 'features/category/categorySlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { Category, CategoryBadge } from './style';

function BlogCategory() {
  const router = useRouter();
  const categorys = useAppSelector(selectCategorys);

  return (
    <CategoryBadge>
      {categorys.map((category) => (
        <Link href={`/category/${category.id}`} key={category.id}>
          <Category currentPage={category.id === Number(router.query.id)}>
            {category.name} ({category.postCnt})
          </Category>
        </Link>
      ))}
    </CategoryBadge>
  );
}

export default BlogCategory;
