import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { selectCategorys } from 'features/category/categorySlice';
import { CategoryType } from 'features/category/type';
import { useAppSelector } from 'hooks/useRtkCustomHook';
import { Selector, Option } from './style';

const categorys: CategoryType[] = [
  { id: 1, name: '스프링', postCnt: 5 },
  { id: 2, name: '데이터', postCnt: 2 },
  { id: 3, name: '나다', postCnt: 2 },
  { id: 4, name: '알고리즘', postCnt: 5 },
];

interface IProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

function CategorySelector({ category, setCategory }: IProps) {
  // const categorys = useAppSelector(selectCategorys);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <Selector onChange={handleSelect} value={category}>
      {categorys.map((category) => (
        <Option value={category.name} key={category.id}>
          {category.name} {category.postCnt}개
        </Option>
      ))}
    </Selector>
  );
}

export default CategorySelector;
