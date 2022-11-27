import { Link } from 'react-router-dom';
import { AiOutlineTag } from 'react-icons/ai';

import useTagQuery from 'hooks/useTagQuery';

import * as S from './style';

function Tags() {
  const { fetchAllTagsQuery } = useTagQuery();
  const { data: allTags } = fetchAllTagsQuery();

  return (
    <S.Container>
      <S.Title># 태그모음</S.Title>

      <S.TagBox>
        {allTags?.map((tag) => (
          <Link to={`/tag/${tag.tagName}`} key={tag.id}>
            <S.TagBadge>
              <AiOutlineTag size={15} />
              <S.TagName>{tag.tagName}</S.TagName>
            </S.TagBadge>
          </Link>
        ))}
      </S.TagBox>
    </S.Container>
  );
}

export default Tags;
