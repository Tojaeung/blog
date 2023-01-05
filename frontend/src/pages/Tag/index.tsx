import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AiOutlineTag } from 'react-icons/ai';

import { getAllTags } from 'apis/tag';

import MetaTag from 'layouts/MetaTag';

import * as S from './style';

function Tags() {
  const { data: allTags } = useQuery(['allTags'], () => getAllTags());

  return (
    <>
      <MetaTag
        title='#태그모음 - 토재웅'
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        url='https://tojaeung.com/tag'
      />
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
