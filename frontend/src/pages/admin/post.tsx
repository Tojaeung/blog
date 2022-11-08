import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';
import { createPost } from 'features/post/postThunk';
import { selectCategorys } from 'features/category/categorySlice';
import { getCategorys } from 'features/category/categoryThunk';
import { useAppDispatch, useAppSelector } from 'hooks/useRtkCustomHook';

const Editor = dynamic(() => import('components/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Post: NextPage = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuthAccessToken);
  const categorys = useAppSelector(selectCategorys);

  const [categoryId, setCategoryId] = useState<number>(categorys[0].id);
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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${categoryId}/post`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      alert('포스팅 되었습니다.');
    } catch (e) {
      alert('포스팅 실패하였습니다.');
    }
  };

  return (
    <Container>
      <Selector onChange={(e) => setCategoryId(Number(e.target.value))} value={categoryId}>
        {categorys.map((category) => (
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

// 인증안된 사용자 못오게 막음
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = store.getState().auth;

  // 페이지 새로고침시 인증정보 다시 가져오기
  if (refreshToken && accessToken === '') {
    axios.defaults.headers.Cookie = refreshToken;
    await store.dispatch(refresh());
  }

  // 인증정보(리프레쉬, 엑세스 토큰) 없을시 접근불가 홈페이지로 리다이렉트
  if (!refreshToken && accessToken === '') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  await store.dispatch(getCategorys());

  return { props: { message: 'Message from SSR' } };
});

import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonSelectStyle, CommonOptionStyle } from 'styles/globalStyle';
import { selectAuthAccessToken } from 'features/auth/authSlice';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;
export const Selector = styled(CommonSelectStyle)``;
export const Option = styled(CommonOptionStyle)``;

const TitleInput = styled(CommonInputStyle)``;
const ThumbnailInput = styled.input``;

const EditorBox = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid;
`;

const SubmitButton = styled(CommonButtonStyle)``;

export default Post;
