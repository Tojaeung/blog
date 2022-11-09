import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';
import { getRefresh } from 'apis/auth';
import { getCategories, createCategory, deleteCategory, updateCategory } from 'apis/category';

import {
  CategoryBox,
  CategoryList,
  Container,
  Count,
  CreateBox,
  CreateButton,
  CreateInput,
  DeleteButton,
  InfoBox,
  Name,
  Title,
  UpdateBox,
  UpdateButton,
  UpdateInput,
} from './style';
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
    <Container>
      <Title>카테고리 편집</Title>
      <CreateBox>
        <CreateInput
          placeholder="새 카테고리 입력"
          onChange={(e) => {
            setNewCategoryName(e.target.value);
          }}
        />
        <CreateButton onClick={handleCreate}>카테고리 생성</CreateButton>
      </CreateBox>

      <CategoryBox>
        {categoriesState.map((category) => {
          return (
            <CategoryList key={category.id}>
              <InfoBox>
                <Name>{category.name}</Name>
                <Count>{category.postCnt}개</Count>
                <DeleteButton onClick={(e) => handleDelete(category.id)}>삭제</DeleteButton>
              </InfoBox>

              <UpdateBox>
                <UpdateInput placeholder="카테고리 이름 변경" onChange={(e) => setUpdatedName(e.target.value)} />
                <UpdateButton onClick={(e) => handleUpdate(category.id)}>업데이트</UpdateButton>
              </UpdateBox>
            </CategoryList>
          );
        })}
      </CategoryBox>
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

export default Category;
