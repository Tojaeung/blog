import Link from 'next/link';
import React from 'react';

import { Title, CategoryBox, CategoryList } from './style';
import { IProp } from './type';

function HomeCategory({ categories }: IProp) {
  return (
    <CategoryBox>
      <Title>Category</Title>
      {categories?.map((category) => (
        <Link href={`category/${category.id}`} key={category.id}>
          <CategoryList>
            {category.name} ({category.postCnt})
          </CategoryList>
        </Link>
      ))}
    </CategoryBox>
  );
}

export default HomeCategory;
