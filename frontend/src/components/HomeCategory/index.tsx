import Link from 'next/link';
import React from 'react';

import { Title, CategoryBox, Badge } from './style';
import { IProp } from './type';

function HomeCategory({ categories }: IProp) {
  return (
    <CategoryBox>
      <Title>Category</Title>
      {categories?.map((category) => (
        <Link href={`category/${category.id}`} key={category.id}>
          <Badge>
            {category.name} ({category.postCnt})
          </Badge>
        </Link>
      ))}
    </CategoryBox>
  );
}

export default HomeCategory;
