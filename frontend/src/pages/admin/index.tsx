import { GetServerSideProps, NextPage } from 'next';
import React, { useState, MouseEvent } from 'react';
import axios from 'axios';
import wrapper from 'apps/store';
import { refresh } from 'features/auth/authThunk';
import { createCategory, deleteCategory, getCategorys, updateCategory } from 'features/category/categoryThunk';
import { selectCategorys } from 'features/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'hooks/useRtkCustomHook';
import {
  Container,
  CategoryBox,
  CategoryList,
  Name,
  Count,
  InfoBox,
  UpdateBox,
  CreateButton,
  UpdateButton,
  DeleteButton,
  Title,
  CreateBox,
  CreateInput,
  UpdateInput,
} from './style';
import { CategoryType } from 'features/category/type';

const categorys: CategoryType[] = [
  { id: 1, name: '스프링', postCnt: 5 },
  { id: 2, name: '데이터', postCnt: 2 },
  { id: 3, name: '나다', postCnt: 2 },
  { id: 4, name: '알고리즘', postCnt: 5 },
];

const Admin: NextPage = () => {
  // const categorys = useAppSelector(selectCategorys);
  const dispatch = useAppDispatch();

  const [newCategory, setNewCategory] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');

  const handleCreate = async () => {
    try {
      await dispatch(createCategory({ name: newCategory }));
    } catch (e) {}
  };

  const handleDelete = async (categoryId: number) => {
    await dispatch(deleteCategory({ categoryId }));
    try {
    } catch (e) {}
  };

  const handleUpdate = async (categoryId: number) => {
    try {
      await dispatch(updateCategory({ categoryId, updatedName: updatedCategory }));
    } catch (e) {}
  };

  return (
    <Container>
      <Title>카테고리 편집</Title>
      <CreateBox>
        <CreateInput
          placeholder="새 카테고리 입력"
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
        />
        <CreateButton onClick={handleCreate}>카테고리 생성</CreateButton>
      </CreateBox>

      <CategoryBox>
        {categorys.map((category) => {
          return (
            <CategoryList key={category.id}>
              <InfoBox>
                <Name>{category.name}</Name>
                <Count>{category.postCnt}개</Count>
                <DeleteButton onClick={(e) => handleDelete(category.id)}>삭제</DeleteButton>
              </InfoBox>

              <UpdateBox>
                <UpdateInput placeholder="카테고리 이름 변경" onChange={(e) => setUpdatedCategory(e.target.value)} />
                <UpdateButton onClick={(e) => handleUpdate(category.id)}>업데이트</UpdateButton>
              </UpdateBox>
            </CategoryList>
          );
        })}
      </CategoryBox>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = store.getState().auth;

  // 페이지 새로고침시 인증정보 다시 가져오기
  if (refreshToken && accessToken === '') {
    axios.defaults.headers.Cookie = refreshToken;
    try {
      await store.dispatch(refresh());
    } catch (e) {
      alert('인증 후 접근 가능합니다.');
      // return {
      //   redirect: {
      //     permanent: false,
      //     destination: '/',
      //   },
      // };
    }
  }

  // 인증정보(리프레쉬, 엑세스 토큰) 없을시 접근불가 홈페이지로 리다이렉트
  if (!refreshToken && accessToken === '') {
    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: '/',
    //   },
    // };
  }

  // 카테고리 정보 없다면 가져오기
  const { categorys } = store.getState().category;
  if (categorys.length === 0) {
    try {
      await store.dispatch(getCategorys());
    } catch (e) {
      alert('카테고리 가져오기 오류');
    }
  }

  return { props: { message: 'Message from SSR' } };
});

export default Admin;
