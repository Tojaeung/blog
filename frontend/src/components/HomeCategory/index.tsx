import Link from 'next/link';
import React from 'react';
import { CategoryType } from 'features/category/type';
import { selectCategorys } from 'features/category/categorySlice';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { Title, CategoryBox, CategoryList } from './style';
import { categorys } from 'constants/practice';

function HomeCategory() {
  // const categorys = useAppSelector(selectCategorys);

  return (
    <CategoryBox>
      <Title>Category</Title>
      {categorys.map((category) => (
        <Link href={`도메인주소/category/${category.name}`} key={category.id}>
          <CategoryList>
            {category.name} ({category.postCnt})
          </CategoryList>
        </Link>
      ))}
    </CategoryBox>
  );
}

export default HomeCategory;
