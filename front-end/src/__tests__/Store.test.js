import { requestPostLike } from '../store/actions'
import store from '../store'

const HOME_INITIAL_STATE = {
  posts: [],
  categories: [],
  isShowWaitProcessModal: false,
  redirectUrl: null,
  selectedPost: { post: undefined, comments: undefined }
};

test('home store initial state', () => {
  store.dispatch({ type: '' });
  const { appProps } = store.getState()
  expect(HOME_INITIAL_STATE).toEqual(appProps);
})
