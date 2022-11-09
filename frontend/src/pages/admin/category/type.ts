import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';

export type IProps = {
  auth: AuthType;
  categories: CategoryType[];
};
