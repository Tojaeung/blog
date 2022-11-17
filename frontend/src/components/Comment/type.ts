import { AuthType } from 'interfaces/auth';
import { CommentType } from 'interfaces/comment';

export type IProps = {
  auth: AuthType | null;
  comments: CommentType[];
};
