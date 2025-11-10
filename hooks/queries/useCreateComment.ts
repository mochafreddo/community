import { useMutation } from '@tanstack/react-query';

import { createComment } from '@/api/comment';
import { queryClient } from '@/api/queryClient';
import { queryKeys } from '@/constants';

export function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}
