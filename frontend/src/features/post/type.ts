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
  createdAt: Date;
  lastModifiedAt: Date;
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

export type getPostsReturnType = {
  posts: PostType[];
};

export type getPostsParamType = {
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
