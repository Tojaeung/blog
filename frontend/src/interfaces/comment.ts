export type CommentType = {
  id: number;
  author: string;
  content: string;
  isAdmin: boolean;
  parentId: number;
  children: CommentType[];
  createdAt: string;
  lastModifiedAt: string;
};
