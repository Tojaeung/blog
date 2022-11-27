import { adminApi, clientApi } from 'utils/axios';
import { IPagePost } from 'interfaces/post';
import { ITag } from 'interfaces/tag';

export const searchTagName = async (keyword: string): Promise<string[]> => {
  const { data } = await adminApi.get(`/search?tagName=${keyword}`);
  return data;
};

export const fetchAllTags = async (): Promise<ITag[]> => {
  const { data } = await clientApi.get('/tags');
  return data;
};

export const fetchPostsInTag = async (tagName: string, page: number): Promise<IPagePost> => {
  const { data } = await clientApi.get(`/tag?tagName=${tagName}&page=${page}`);
  return data;
};
