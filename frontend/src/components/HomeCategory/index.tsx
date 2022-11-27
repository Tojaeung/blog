import { Link } from 'react-router-dom';

import useCategoryQuery from 'hooks/useCategoryQuery';

import * as S from './style';

function HomeCategory() {
  const { fetchCategoriesQuery } = useCategoryQuery();

  const { data: categories } = fetchCategoriesQuery();

  return (
    <S.CategoryBox>
      <S.Title>Category</S.Title>
      {categories?.map((category) => (
        <Link to={`category/${category.id}`} key={category.id}>
          <S.Badge>
            {category.name} ({category.postCnt})
          </S.Badge>
        </Link>
      ))}
    </S.CategoryBox>
  );
}

export default HomeCategory;
