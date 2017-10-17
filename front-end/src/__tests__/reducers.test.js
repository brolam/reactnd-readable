import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { GET_POSTS, getPosts } from '../actions/index.js'
import { post } from '../reducers/index.js';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('Get posts', () => {
    const store = mockStore();
    expect(store.dispatch(getPosts([]))).toEqual({ type: GET_POSTS, posts: [] });
})