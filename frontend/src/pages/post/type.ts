import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';
import { CommentType } from 'interfaces/comment';
import { PostType } from 'interfaces/post';

export type IProps = {
  auth: AuthType | null;
  categories: CategoryType[];
  post: PostType;
  comments: CommentType[];
};
