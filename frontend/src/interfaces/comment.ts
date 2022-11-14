export type CommentType = {
  id: number;
  author: string;
  content: string;
  parentId: number;
  children: CommentType[];
  createdAt: string;
  lastModifiedAt: string;
};
