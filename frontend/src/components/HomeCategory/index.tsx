import { Link } from 'react-router-dom';

import * as S from './style';
import { IProp } from './type';

function HomeCategory({ categories }: IProp) {
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
