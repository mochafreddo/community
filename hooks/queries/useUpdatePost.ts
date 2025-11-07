import { useMutation } from '@tanstack/react-query';

import { updatePost } from '@/api/post';
import { queryClient } from '@/api/queryClient';
import { queryKeys } from '@/constants';

export function useUpdatePost() {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}
