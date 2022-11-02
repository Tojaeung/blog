interface CategoryType {
  id: number;
  name: string;
}

export type PostType = {
  id: number;
  title: string;
  content: string;
  views: number;
  thumbnail: string;
  category: CategoryType;
  createdAt: string;
  lastModifiedAt: string;
};

export type PostState = {
  posts: PostType[];
};

//////// thunk //////////////
export type createPostReturnType = {
  post: PostType;
};

export type createPostParamType = {
  category: string;
  formData: FormData;
};

export type getPostsTop5ReturnType = {
  posts: PostType[];
};

export type getPostsReturnType = {
  posts: PostType[];
};

export type getPostsParamType = {
  category: string;
};

export type getPostsInCategoryReturnType = {
  posts: PostType[];
};

export type getPostsInCategoryParamType = {
  category: string;
};

export type getPostReturnType = {
  post: PostType;
};

export type getPostParamType = {
  postId: number;
};

export type updatePostReturnType = {
  updatedPost: PostType;
};

export type updatePostParamType = {
  postId: number;
  formData: FormData;
};

export type deletePostReturnType = {
  deletedId: number;
};

export type deletePostParamType = {
  postId: number;
};
