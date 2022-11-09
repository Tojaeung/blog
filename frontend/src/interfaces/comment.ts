export type CommentType = {
  id: number;
  content: string;
  postId: number;
  children: CommentType;
  createdAt: string;
  lastModifiedAt: string;
};
