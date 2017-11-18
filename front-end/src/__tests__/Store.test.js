import { requestPostLike } from '../store/actions'
import store from '../store'

const HOME_INITIAL_STATE = {
  searchPosts : undefined,  
  posts: [],
  postsOrder: 'voteScore',
  categories: [],
  commentsOrder: 'voteScore',
  isShowWaitProcessModal: false,
  redirectUrl: null,
  selectedPost: { post: undefined, comments: undefined }
};

test('home store initial state', () => {
  store.dispatch({ type: '' });
  const { appProps } = store.getState()
  expect(HOME_INITIAL_STATE).toEqual(appProps);
})
