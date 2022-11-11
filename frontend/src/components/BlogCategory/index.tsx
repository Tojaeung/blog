import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

import { Container, Badge } from './style';
import { IProp } from './type';

function BlogCategory({ categories }: IProp) {
  const router = useRouter();

  return (
    <Container>
      {categories.map((category) => (
        <Link href={`/category/${category.id}`} key={category.id}>
          <Badge currentPage={category.id === Number(router.query.id)}>
            {category.name} ({category.postCnt})
          </Badge>
        </Link>
      ))}
    </Container>
  );
}

export default BlogCategory;
