import { adminApi, clientApi } from 'utils/axios';
import { IPagePost } from 'interfaces/post';
import { ITag } from 'interfaces/tag';

export const searchTagName = async (keyword: string): Promise<string[]> => {
  const { data } = await adminApi.get(`/search?tagName=${keyword}`);
  return data;
};

export const getAllTags = async (): Promise<ITag[]> => {
  const { data } = await clientApi.get('/tags');
  return data;
};

export const getPostsInTag = async (tagName: string, pageNum: number): Promise<IPagePost> => {
  const { data } = await clientApi.get(`/tag?tagName=${tagName}&page=${pageNum}`);
  return data;
};
