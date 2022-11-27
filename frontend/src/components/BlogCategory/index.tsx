import { Link, useParams } from 'react-router-dom';

import useCategoryQuery from 'hooks/useCategoryQuery';

import * as S from './style';

function BlogCategory() {
  const { id } = useParams();

  const { fetchCategoriesQuery } = useCategoryQuery();

  const { data: categories } = fetchCategoriesQuery();

  return (
    <S.Container>
      {categories?.map((category) => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <S.Badge currentPage={category.id === Number(id)}>
            {category.name} ({category.postCnt})
          </S.Badge>
        </Link>
      ))}
    </S.Container>
  );
}

export default BlogCategory;
