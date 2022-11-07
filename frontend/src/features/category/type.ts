///////// slice /////////////

export type CategoryType = {
  id: number;
  name: string;
  postCnt: number; // 카테고리의 포스팅 갯수
};

export type CategoryState = {
  categorys: CategoryType[];
  selectedCategory: CategoryType | null;
};

//////// thunk //////////////
// export type createCategoryReturnType = {
//   categorys: CategoryType;
// };

// export type createCategoryParamType = {
//   name: string;
// };

// export type getCategorysReturnType = {
//   categorys: CategoryType[];
// };

// export type updateCategoryReturnType = {
//   updatedCategory: CategoryType;
// };

// export type updateCategoryParamType = {
//   categoryId: number;
//   updatedName: string;
// };

// export type deleteCategoryReturnType = {
//   deletedId: number;
// };

// export type deleteCategoryParamType = {
//   categoryId: number;
// };
