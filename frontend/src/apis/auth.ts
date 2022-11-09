import axios from 'axios';

export const getRefresh = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, {
    withCredentials: true,
  });

  return res.data;
};

export const login = async (username: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
    { username, password },
    {
      withCredentials: true,
    },
  );

  return res.data;
};
