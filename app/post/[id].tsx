import { Fragment, useRef, useState } from 'react';

import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { AuthRoute } from '@/components/AuthRoute';
import { CommentItem } from '@/components/CommentItem';
import { FeedItem } from '@/components/FeedItem';
import { InputField } from '@/components/InputField';
import { colors } from '@/constants';
import { useCreateComment } from '@/hooks/queries/useCreateComment';
import { useGetPost } from '@/hooks/queries/useGetPost';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const [content, setContent] = useState<string>('');
  const scrollRef = useRef<ScrollView | null>(null);
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  if (isPending || isError) return <></>;

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss();
  };

  const handleSubmitComment = () => {
    if (!content.trim()) return;

    const commentData = { postId: post.id, content };

    if (parentCommentId) {
      createComment.mutate({ ...commentData, parentCommentId });
      setContent('');
      handleCancelReply();
      return;
    }

    createComment.mutate(commentData);

    setContent('');
    setTimeout(() => scrollRef.current?.scrollToEnd(), 500);
  };

  return (
    <AuthRoute>
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView
            ref={scrollRef}
            style={{ marginBottom: insets.bottom + 40 }}
          >
            <View>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>

            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                  comment={comment}
                />
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>
        </KeyboardAwareScrollView>

        <View
          style={[styles.commentInputContainer, { bottom: insets.bottom + 8 }]}
        >
          <InputField
            ref={inputRef}
            value={content}
            returnKeyType="send"
            onSubmitEditing={handleSubmitComment}
            onChangeText={(text) => setContent(text)}
            placeholder={
              parentCommentId ? '답글 남기는 중...' : '댓글을 남겨보세요.'
            }
            rightChild={
              <Pressable
                disabled={!content}
                style={styles.inputButtonContainer}
                onPress={handleSubmitComment}
              >
                <Text style={styles.inputButtonText}>등록</Text>
              </Pressable>
            }
          />
        </View>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.WHITE },
  awareScrollViewContainer: { flex: 1, backgroundColor: colors.WHITE },
  commentCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.WHITE,
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  inputButtonContainer: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: { color: colors.WHITE, fontWeight: 'bold' },
});
