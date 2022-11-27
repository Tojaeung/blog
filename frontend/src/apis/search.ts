import { clientApi } from 'utils/axios';
import { IPagePost } from 'interfaces/post';

export const searchKeyword = async (keyword: string, page: number): Promise<IPagePost> => {
  const { data } = await clientApi.get(`/post/search?keyword=${keyword}&page=${page}`);
  return data;
};
