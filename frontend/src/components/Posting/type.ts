import { AuthType } from 'interfaces/auth';
import { PostingType } from 'interfaces/post';

export type IProps = {
  auth: AuthType | null;
  post: PostingType;
};
