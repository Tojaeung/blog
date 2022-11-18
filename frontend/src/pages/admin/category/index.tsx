import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';
import { getRefresh } from 'apis/auth';
import { getCategories, createCategory, deleteCategory, updateCategory } from 'apis/category';

import * as S from './style';
import { IProps } from './type';

const Category: NextPage<IProps> = ({ auth, categories }) => {
  const [categoriesState, setCategoriesState] = useState(categories);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [updatedName, setUpdatedName] = useState('');

  const handleCreate = async () => {
    try {
      const newCategory = await createCategory(newCategoryName, auth.accessToken);
      setCategoriesState([...categories, newCategory]);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      const deletedId = await deleteCategory(categoryId, auth.accessToken);
      const idx = categoriesState.findIndex((category) => category.id === deletedId);

      setCategoriesState(categoriesState.splice(idx, 1));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleUpdate = async (categoryId: number) => {
    try {
      const updatedCategory = await updateCategory(categoryId, updatedName, auth.accessToken);
      const idx = categoriesState.findIndex((category) => category.id === updatedCategory.id);

      setCategoriesState(categoriesState.splice(idx, 1, updatedCategory));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <S.Container>
      <S.Title>카테고리 편집</S.Title>
      <S.CreateBox>
        <S.CreateInput
          placeholder="새 카테고리 입력"
          onChange={(e) => {
            setNewCategoryName(e.target.value);
          }}
        />
        <S.CreateButton onClick={handleCreate}>카테고리 생성</S.CreateButton>
      </S.CreateBox>

      <S.CategoryBox>
        {categoriesState.map((category) => {
          return (
            <S.CategoryList key={category.id}>
              <S.InfoBox>
                <S.Name>{category.name}</S.Name>
                <S.Count>{category.postCnt}개</S.Count>
                <S.DeleteButton onClick={(e) => handleDelete(category.id)}>삭제</S.DeleteButton>
              </S.InfoBox>

              <S.UpdateBox>
                <S.UpdateInput placeholder="카테고리 이름 변경" onChange={(e) => setUpdatedName(e.target.value)} />
                <S.UpdateButton onClick={(e) => handleUpdate(category.id)}>업데이트</S.UpdateButton>
              </S.UpdateBox>
            </S.CategoryList>
          );
        })}
      </S.CategoryBox>
    </S.Container>
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

export default Category;
