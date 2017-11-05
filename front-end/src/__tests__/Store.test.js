import { requestPostLike } from '../store/actions'
import store from '../store'

const HOME_INITIAL_STATE = {
  posts: [],
  categories: [],
  isShowWaitMessage: false,
};

test('home store initial state', () => {
  store.dispatch({type:''});
  const { home } = store.getState()
  expect(HOME_INITIAL_STATE).toEqual(home);
})
