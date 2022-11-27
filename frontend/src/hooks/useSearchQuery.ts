import { useQuery } from 'react-query';
import { searchKeyword } from 'apis/search';

const useSearchQuery = () => {
  const searchKeywordQuery = (keyword: string, page: number) => {
    return useQuery(['search', keyword], () => searchKeyword(keyword, page));
  };

  return { searchKeywordQuery };
};

export default useSearchQuery;
