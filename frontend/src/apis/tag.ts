import axios from 'axios';
import { PagePostType } from 'interfaces/post';
import { AllTagsType } from 'interfaces/tag';

export const searchTagName = async (keyword: string, accessToken: string): Promise<string[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/search?tagName=${keyword}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return res.data;
};

export const getAllTags = async (): Promise<AllTagsType[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tags`, {
    withCredentials: true,
  });

  return res.data;
};

export const getPostsInTag = async (tagName: string, page: number): Promise<PagePostType> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tag?tagName=${tagName}&page=${page}`, {
    withCredentials: true,
  });

  return res.data;
};
