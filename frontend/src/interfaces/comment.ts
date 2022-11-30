export type IComment = {
  id: number;
  author: string;
  content: string;
  isAdmin: boolean;
  postId: number;
  parentId: number;
  children: IComment[];
  createdAt: string;
  lastModifiedAt: string;
};

export type INewComment = {
  postId: number;
  author: string;
  content: string;
  isAdmin: boolean;
};
export type INewChildComment = {
  postId: number;
  author: string;
  content: string;
  isAdmin: boolean;
  parentId: number;
};
