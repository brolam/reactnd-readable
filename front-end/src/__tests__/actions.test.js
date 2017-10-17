import { GET_POSTS, getPosts } from '../actions/index.js'

it('Get posts', () => {
    expect(getPosts([])).toEqual({ type: GET_POSTS, posts: [] });
});
