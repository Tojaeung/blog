import { useQuery, useMutation, useQueryClient } from 'react-query';
import { login, getRefresh } from 'apis/auth';

const { setQueryData } = useQueryClient();

export const useRefreshQuery = () => {
  return useQuery('auth', () => getRefresh());
};

export const useLoginQuery = (username: string, password: string) => {
  return useMutation('auth', () => login(username, password), {
    onSuccess: (auth) => {
      setQueryData('auth', auth);
    },
  });
};
