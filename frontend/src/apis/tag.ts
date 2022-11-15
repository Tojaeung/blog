import axios from 'axios';

export const searchTagName = async (keyword: string, accessToken: string): Promise<string[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/search?tagName=${keyword}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return res.data;
};
