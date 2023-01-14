import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AiOutlineTag } from 'react-icons/ai';
import { Helmet } from 'react-helmet-async';

import { getAllTags } from 'apis/tag';

import * as S from './style';

function Tags() {
  const { data: allTags } = useQuery(['allTags'], () => getAllTags());

  return (
    <>
      <Helmet>
        <title>#태그모음 - 토재웅</title>
      </Helmet>
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
    </>
  );
}

export default Tags;
