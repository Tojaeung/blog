import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { createPost } from 'apis/post';
import { getCategories } from 'apis/category';

import { Container, EditorBox, Option, Selector, SubmitButton, ThumbnailInput, TitleInput } from './style';
import { IProps } from './type';

const Editor = dynamic(() => import('components/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Post: NextPage<IProps> = ({ auth, categories }) => {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();

  const viewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewContainerRef.current) viewContainerRef.current.innerHTML += content;
  }, [content]);

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
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
    <Container>
      <Selector onChange={(e) => setCategoryId(Number(e.target.value))} value={categoryId}>
        {categories.map((category) => (
          <Option value={category.id} key={category.id}>
            {category.name} {category.postCnt}개
          </Option>
        ))}
      </Selector>
      <TitleInput placeholder="포스팅 제목" onChange={(e) => setTitle(e.target.value)} />
      <EditorBox>
        <Editor htmlStr={content} setHtmlStr={setContent} />
      </EditorBox>
      <ThumbnailInput type="file" accept="image/*" onChange={onUploadImage} />
      <SubmitButton onClick={handleSubmit}>포스팅하기</SubmitButton>
    </Container>
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
