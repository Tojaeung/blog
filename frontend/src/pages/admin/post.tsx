import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { createPost } from 'apis/post';
import { getCategories } from 'apis/category';
import { searchTagName } from 'apis/tag';

import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';

interface IProps {
  auth: AuthType;
  categories: CategoryType[];
}

const Editor = dynamic(() => import('components/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Post: NextPage<IProps> = ({ auth, categories }) => {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<number>(categories[0].id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();

  // 태그검색
  const [keyword, setKeyword] = useState('');
  const [searchedTags, setSearchedTags] = useState<string[]>([]);

  // 태그추가
  const [tagName, setTagName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const viewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewContainerRef.current) viewContainerRef.current.innerHTML += content;
  }, [content]);

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setThumbnail(e.target.files[0]);
  };

  const handleSearchTagName = async () => {
    const tags = await searchTagName(keyword, auth.accessToken);
    setSearchedTags(tags);
  };

  const handleSubmit = async () => {
    const body = { title, content, tags };

    const formData = new FormData();
    formData.append('thumbnail', thumbnail!);
    formData.append('createReqDto', new Blob([JSON.stringify(body)], { type: 'application/json' }));

    try {
      const newPostId = await createPost(categoryId, formData, auth.accessToken);
      alert('포스팅 되었습니다.');
      router.push(`/post/${newPostId}`);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Container>
      <Selector onChange={(e) => setCategoryId(Number(e.target.value))} value={categoryId}>
        {categories.map((category) => (
          <Option value={category.id} key={category.id}>
            {category.name} {category.postCnt}개
          </Option>
        ))}
      </Selector>

      <TitleInput placeholder="포스팅 제목" onChange={(e) => setTitle(e.target.value)} />

      <Editor htmlStr={content} setHtmlStr={setContent} />

      <ThumbnailInput type="file" accept="image/*" onChange={onUploadImage} />

      <TagSearchBox>
        <SearchTagInput placeholder="태그검색.." onChange={(e) => setKeyword(e.target.value)} />
        <SearchButton onClick={handleSearchTagName}>검색</SearchButton>
        {!searchedTags.length ? <p>검색된 태그가 없습니다.</p> : <p>{JSON.stringify(searchedTags)}</p>}
      </TagSearchBox>

      <TagBox>
        <TagInput placeholder="태그추가.." onChange={(e) => setTagName(e.target.value)} />
        <AddTagButton onClick={(e) => setTags([...tags, tagName])}>추가</AddTagButton>
        <InitButton onClick={(e) => setTags([])}>초기화</InitButton>
        {!tags.length ? <p>추가된 태그가 없습니다.</p> : <p>{JSON.stringify(tags)}</p>}
      </TagBox>

      <SubmitButton onClick={handleSubmit}>포스팅하기</SubmitButton>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  // 인증정보 없다면 접근불가
  if (!refreshToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  axios.defaults.headers.Cookie = refreshToken;
  const auth = await getRefresh();

  // 엑세스 토큰을 응답받지 못하면 접근불가
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const categories = await getCategories();

  return { props: { auth, categories } };
};

import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonSelectStyle, CommonOptionStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
  }
`;
const Selector = styled(CommonSelectStyle)``;
const Option = styled(CommonOptionStyle)``;

const TitleInput = styled(CommonInputStyle)``;
const ThumbnailInput = styled.input``;

const TagSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SearchTagInput = styled(CommonInputStyle)``;
const SearchButton = styled(CommonButtonStyle)``;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const TagInput = styled(CommonInputStyle)``;
const AddTagButton = styled(CommonButtonStyle)``;
const InitButton = styled(CommonButtonStyle)``;

const SubmitButton = styled(CommonButtonStyle)``;

export default Post;
