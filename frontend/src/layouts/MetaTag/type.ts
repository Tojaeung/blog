import { ITag } from 'interfaces/tag';

export type IProps = {
  title: string;
  desc: string;
  keywords?: ITag[];
  url: string;
};
