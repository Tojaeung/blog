import { ITag } from './tag';

export type IPost = {
  id: number;
  title: string;
  content: string;
  views: number;
  thumbnail: string;
  categoryName: string;
  tags: ITag[];
  createdAt: string;
  lastModifiedAt: string;
};

export type IPagePost = {
  totalCnt: number;
  posts: IPost[];
};

export type INewPost = {
  categoryId: number;
  formData: FormData;
};

export type IUpdatedPost = {
  postId: number;
  formData: FormData;
};
