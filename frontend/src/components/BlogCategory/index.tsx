import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';

import { getCategories } from 'apis/category';

import * as S from './style';

function BlogCategory() {
  const { categoryId } = useParams();

  const { data: categories } = useQuery(['categories'], () => getCategories());

  return (
    <S.Container>
      {categories?.map((category) => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <S.Badge currentPage={category.id === Number(categoryId)}>
            {category.name} ({category.postCnt})
          </S.Badge>
        </Link>
      ))}
    </S.Container>
  );
}

export default BlogCategory;
