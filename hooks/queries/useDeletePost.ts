import { useMutation } from '@tanstack/react-query';

import { deletePost } from '@/api/post';
import { queryClient } from '@/api/queryClient';
import { queryKeys } from '@/constants';

export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}
