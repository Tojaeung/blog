import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';
import { PostType } from 'interfaces/post';

export type IProps = {
  auth: AuthType | null;
  categories: CategoryType[];
  post: PostType;
};
