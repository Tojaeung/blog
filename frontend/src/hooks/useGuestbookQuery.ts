import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addGuestbook, deleteGuestbook, fetchGuestbooks } from 'apis/guestbook';

const useGuestbookQuery = () => {
  const { invalidateQueries } = useQueryClient();

  const addGuestbookMutation = useMutation({
    mutationFn: addGuestbook,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['guestbook'] });
    },
  });

  const fetchGuestbooksQuery = () => {
    return useQuery({ queryKey: ['guestbook'], queryFn: () => fetchGuestbooks() });
  };

  const deleteGuestbookMutation = useMutation({
    mutationFn: deleteGuestbook,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['guestbook'] });
    },
  });

  return { addGuestbookMutation, fetchGuestbooksQuery, deleteGuestbookMutation };
};

export default useGuestbookQuery;
