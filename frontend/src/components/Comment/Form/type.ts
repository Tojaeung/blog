import { CommentType } from 'interfaces/comment';

export type IProp = {
  commentsState: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  parentId: number | undefined;
};
