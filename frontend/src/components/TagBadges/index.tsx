import { Link } from 'react-router-dom';
import { AiOutlineTag } from 'react-icons/ai';

import * as S from './style';
import { IProp } from './type';

function TagBadges({ tags }: IProp) {
  return (
    <S.Container>
      {tags?.map((tag) => (
        <Link to={`/tag/${tag.tagName}`} key={tag.id}>
          <S.TagBadge>
            <AiOutlineTag size={15} />
            <S.TagName>{tag.tagName}</S.TagName>
          </S.TagBadge>
        </Link>
      ))}
    </S.Container>
  );
}

export default TagBadges;
