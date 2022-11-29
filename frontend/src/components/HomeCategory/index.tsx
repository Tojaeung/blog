import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getCategories } from 'apis/category';

import * as S from './style';

function HomeCategory() {
  const { data: categories } = useQuery(['categories'], () => getCategories());

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
