import { router } from 'expo-router';

import { useMutation } from '@tanstack/react-query';

import { createPost } from '@/api/post';
import { queryClient } from '@/api/queryClient';
import { queryKeys } from '@/constants';

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace('/');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}
