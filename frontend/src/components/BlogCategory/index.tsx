import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

import { Category, CategoryBadge } from './style';
import { IProp } from './type';

function BlogCategory({ categories }: IProp) {
  const router = useRouter();

  return (
    <CategoryBadge>
      {categories.map((category) => (
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
