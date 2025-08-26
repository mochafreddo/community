import { SafeAreaView } from 'react-native';

import { FeedItem } from '@/components/FeedItem';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <FeedItem
        post={{
          id: 1,
          userId: 1,
          title: '더미 제목입니다.',
          description:
            '이것은 더미 데이터의 설명입니다. 여러 줄로 작성되어 있으며, 실제 게시글의 내용을 대체합니다. ' +
            'React Native와 Expo를 활용하여 앱을 개발할 때, 컴포넌트의 레이아웃이나 스타일을 테스트하기 위해 사용됩니다. ' +
            '이 설명은 3줄이 넘도록 충분히 길게 작성되었습니다. 추가적인 텍스트를 넣어서 스크롤이나 줄바꿈 처리가 잘 되는지 확인할 수 있습니다.',
          createdAt: '',
          author: { id: 1, nickname: '닉네임', imageUri: '' },
          imageUris: [],
          likes: [],
          hasVote: false,
          voteCount: 1,
          commentCount: 1,
          viewCount: 1,
        }}
      />
    </SafeAreaView>
  );
}
