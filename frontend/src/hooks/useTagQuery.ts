import { useQuery } from 'react-query';
import { fetchAllTags, fetchPostsInTag } from 'apis/tag';

const useTagQuery = () => {
  const fetchAllTagsQuery = () => {
    return useQuery('allTags', () => fetchAllTags());
  };

  const fetchPostsInTagQuery = (tagName: string, page: number) => {
    return useQuery(['postsInTag', tagName], () => fetchPostsInTag(tagName, page));
  };

  return { fetchAllTagsQuery, fetchPostsInTagQuery };
};

export default useTagQuery;
