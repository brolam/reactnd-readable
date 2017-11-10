import { requestPostLike } from '../store/actions'
import store from '../store'

const HOME_INITIAL_STATE = {
  posts: [],
  categories: [],
  isShowWaitProcessModal: false,
  redirectUrl: null
};

test('home store initial state', () => {
  store.dispatch({ type: '' });
  const { home } = store.getState()
  expect(HOME_INITIAL_STATE).toEqual(home);
})
