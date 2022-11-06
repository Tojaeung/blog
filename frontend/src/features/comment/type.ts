///////// slice /////////////

export type CommentType = {
  id: number;
  content: string;
  postId: number;
  children: CommentType;
  createdAt: string;
  lastModifiedAt: string;
};

export type CommentState = {
  comments: CommentType[];
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
