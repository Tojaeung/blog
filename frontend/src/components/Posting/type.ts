import { AuthType } from 'interfaces/auth';
import { PostType } from 'interfaces/post';

export type IProps = {
  auth: AuthType | null;
  post: PostType;
};
