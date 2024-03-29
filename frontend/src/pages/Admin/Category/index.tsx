import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Helmet } from 'react-helmet-async';

import { addCategory, deleteCategory, getCategories, updateCategory } from 'apis/category';

import * as S from './style';

function Category() {
  const queryCache = useQueryClient();

  const [newCategoryName, setNewCategoryName] = useState('');
  const [updatedName, setUpdatedName] = useState('');

  const { data: categories } = useQuery(['categories'], () => getCategories());
  const { mutate: addCategoryMutate } = useMutation(addCategory);
  const { mutate: updateCategoryMutate } = useMutation(updateCategory);
  const { mutate: deleteCategoryMutate } = useMutation(deleteCategory);

  const handleCreate = async () =>
    addCategoryMutate(newCategoryName, {
      onSuccess: () => {
        queryCache.invalidateQueries({ queryKey: ['categories'] });
        alert('카테고리 생성되었습니다.');
      },
      onError: (e: any) => {
        alert(e.response.data.message);
      },
    });
  const handleUpdate = async (categoryId: number) =>
    updateCategoryMutate(
      { categoryId, updatedName },
      {
        onSuccess: () => {
          queryCache.invalidateQueries({ queryKey: ['categories'] });
          alert('카테고리 변경되었습니다.');
        },
        onError: (e: any) => {
          alert(e.response.data.message);
        },
      },
    );
  const handleDelete = async (categoryId: number) =>
    deleteCategoryMutate(categoryId, {
      onSuccess: () => {
        queryCache.invalidateQueries({ queryKey: ['categories'] });
        alert('카테고리 삭제되었습니다.');
      },
      onError: (e: any) => {
        alert(e.response.data.message);
      },
    });

  return (
    <>
      <Helmet>
        <title>카테고리 관리 - 토재웅</title>
      </Helmet>
      <S.Container>
        <S.Title>카테고리 편집</S.Title>
        <S.CreateBox>
          <S.CreateInput
            placeholder='새 카테고리 입력'
            onChange={(e) => {
              setNewCategoryName(e.target.value);
            }}
          />
          <S.CreateButton onClick={handleCreate}>카테고리 생성</S.CreateButton>
        </S.CreateBox>

        <S.CategoryBox>
          {categories?.map((category) => {
            return (
              <S.CategoryList key={category.id}>
                <S.InfoBox>
                  <S.Name>{category.name}</S.Name>
                  <S.Count>{category.postCnt}개</S.Count>
                  <S.DeleteButton onClick={() => handleDelete(category.id)}>삭제</S.DeleteButton>
                </S.InfoBox>

                <S.UpdateBox>
                  <S.UpdateInput placeholder='카테고리 이름 변경' onChange={(e) => setUpdatedName(e.target.value)} />
                  <S.UpdateButton onClick={() => handleUpdate(category.id)}>업데이트</S.UpdateButton>
                </S.UpdateBox>
              </S.CategoryList>
            );
          })}
        </S.CategoryBox>
      </S.Container>
    </>
  );
}

export default Category;
