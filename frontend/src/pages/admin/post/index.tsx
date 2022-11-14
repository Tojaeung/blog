import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { createPost } from 'apis/post';
import { getCategories } from 'apis/category';

import * as S from './style';
import { IProps } from './type';
import { searchTagName } from 'apis/tag';
import { TagType } from 'interfaces/tag';

const Editor = dynamic(() => import('components/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Post: NextPage<IProps> = ({ auth, categories }) => {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();

  // 태그검색
  const [keyword, setKeyword] = useState('');
  const [searchedTags, setSearchedTags] = useState<TagType[]>([]);

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
    const req = { title: title, content: content, tags: tags };

    const formData = new FormData();
    formData.append('thumbnail', thumbnail!);

    try {
      const newPost = await createPost(categoryId, formData, auth.accessToken);
      alert('포스팅 되었습니다.');
      router.push(`/post/${newPost.id}`);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <S.Container>
      <S.Selector onChange={(e) => setCategoryId(Number(e.target.value))} value={categoryId}>
        {categories.map((category) => (
          <S.Option value={category.id} key={category.id}>
            {category.name} {category.postCnt}개
          </S.Option>
        ))}
      </S.Selector>

      <S.TitleInput placeholder="포스팅 제목" onChange={(e) => setTitle(e.target.value)} />

      <Editor htmlStr={content} setHtmlStr={setContent} />

      <S.ThumbnailInput type="file" accept="image/*" onChange={onUploadImage} />

      <S.TagSearchBox>
        <S.SearchTagInput placeholder="태그검색.." onChange={(e) => setKeyword(e.target.value)} />
        <S.SearchButton onClick={handleSearchTagName}>검색</S.SearchButton>
        {!searchedTags.length ? <p>검색된 태그가 없습니다.</p> : <p>{JSON.stringify(searchedTags)}</p>}
      </S.TagSearchBox>

      <S.TagBox>
        <S.TagInput placeholder="태그추가.." onChange={(e) => setTagName(e.target.value)} />
        <S.AddTagButton onClick={(e) => setTags([...tags, tagName])}>추가</S.AddTagButton>
        <S.InitButton onClick={(e) => setTags([])}>초기화</S.InitButton>
        {!tags.length ? <p>추가된 태그가 없습니다.</p> : <p>{JSON.stringify(tags)}</p>}
      </S.TagBox>

      <S.SubmitButton onClick={handleSubmit}>포스팅하기</S.SubmitButton>
    </S.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  let auth;
  try {
    auth = await getRefresh();
  } catch (err) {
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

export default Post;
