interface CategoryType {
  id: number;
  name: string;
}

interface PostType {
  id: number;
  title: string;
  content: string;
  views: number;
  thumbnail: string;
  category: CategoryType;
  createdAt: Date;
  lastModifiedAt: Date;
}

//////// thunk //////////////
export type createPostReturnType = {
  newPost: PostType;
};

export type createPostParamType = {
  category: string;
  formData: FormData;
};

export type getPostReturnType = {
  categorys: CategoryType[];
};

export type updatePostReturnType = {
  updatedCategory: CategoryType;
};

export type updatePostParamType = {
  categoryId: number;
  updatedName: string;
};

export type deletePostReturnType = {
  deletedId: number;
};

export type deletePostParamType = {
  postId: number;
};
