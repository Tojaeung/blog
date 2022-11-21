import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';
import { getRefresh } from 'apis/auth';
import { getCategories, createCategory, deleteCategory, updateCategory } from 'apis/category';

import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';

interface IProps {
  auth: AuthType;
  categories: CategoryType[];
}

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
import { CommonTitleStyle, CommonButtonStyle, CommonInputStyle, CommonTextStyle } from 'styles/globalStyle';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled(CommonTitleStyle)``;

const CreateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const CreateInput = styled(CommonInputStyle)``;
const CreateButton = styled(CommonButtonStyle)``;

const CategoryBox = styled.ul``;
const CategoryList = styled.li`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Name = styled(CommonTextStyle)``;
const Count = styled(CommonTextStyle)``;
const DeleteButton = styled(CommonButtonStyle)``;

const UpdateBox = styled.div`
  display: flex;
  gap: 10px;
`;

const UpdateInput = styled(CommonInputStyle)``;
const UpdateButton = styled(CommonButtonStyle)``;

export default Category;
