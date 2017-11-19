import {
  requestPost,
  requestSearchPosts,
  returnPosts,
  returnPost,
  requestSavePost,
  requestPostLike,
  requestDeletePost,
  requestVoteScorePost,
  requestSaveComment,
  requestVoteScorePostComment,
  requestDeletePostComment,
  requestChangeOrderPosts,
  requestChangeOrderComments
} from '../store/actions'
import store from '../store'

const HOME_INITIAL_STATE = {
  searchPosts: undefined,
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

test('actions', () => {
  expect(requestSearchPosts('udacity')).toEqual({
    type: 'REQUEST_SEARCH_POSTS',
    searchPosts: 'udacity',
    redirectUrl: null
  })

  expect(requestPost('7ni6ok3ym7mf1p33lnez')).toEqual({
    type: 'REQUEST_POST',
    postId: '7ni6ok3ym7mf1p33lnez',
    redirectUrl: null
  })

  expect(returnPosts([], [])).toEqual({
    type: 'RETURN_POSTS',
    posts: [],
    categories: [],
    redirectUrl: null
  })

  expect(returnPost('7ni6ok3ym7mf1p33lnez', [])).toEqual({
    type: 'RETURN_POST',
    post: '7ni6ok3ym7mf1p33lnez',
    comments: [],
    redirectUrl: null
  })

  expect(requestSavePost('7ni6ok3ym7mf1p33lnez')).toEqual({
    type: 'REQUEST_SAVE_POST',
    post: '7ni6ok3ym7mf1p33lnez',
    redirectUrl: null
  })

  expect(requestDeletePost('7ni6ok3ym7mf1p33lnez')).toEqual({
    type: 'REQUEST_DELETE_POST',
    postId: '7ni6ok3ym7mf1p33lnez',
    redirectUrl: null
  })

  expect(requestVoteScorePost('7ni6ok3ym7mf1p33lnez', 'upVote')).toEqual({
    type: 'REQUEST_VOTE_SCORE_POST',
    postId: '7ni6ok3ym7mf1p33lnez',
    option: 'upVote',
    redirectUrl: null
  })

  expect(requestSaveComment('7ni6ok3ym7mf1p33lnez', 'Any comment')).toEqual({
    type: 'REQUEST_SAVE_COMMENT',
    postId: '7ni6ok3ym7mf1p33lnez',
    comment: 'Any comment',
    redirectUrl: null
  })

  expect(requestVoteScorePostComment('7ni6ok3ym7mf1p33lnez', '894tuq4ut84ut8v4t8wun89g', 'upVote')).toEqual({
    type: 'REQUEST_VOTE_SCORE_POST_COMMENT',
    postId: '7ni6ok3ym7mf1p33lnez',
    commentId: '894tuq4ut84ut8v4t8wun89g',
    option: 'upVote',
    redirectUrl: null
  })

  expect(requestDeletePostComment('7ni6ok3ym7mf1p33lnez', '894tuq4ut84ut8v4t8wun89g')).toEqual({
    type: 'REQUEST_DELETE_POST_COMMENT',
    postId: '7ni6ok3ym7mf1p33lnez',
    commentId: '894tuq4ut84ut8v4t8wun89g',
    redirectUrl: null
  })

  expect(requestChangeOrderComments('publishedDate')).toEqual({
    type: 'REQUEST_CHANGE_ORDER_COMMENTS',
    commentsOrder: 'publishedDate',
    redirectUrl: null
  });

  expect(requestChangeOrderPosts('publishedDate')).toEqual({
    type: 'REQUEST_CHANGE_ORDER_POSTS',
    postsOrder: 'publishedDate',
    redirectUrl: null
  })

})
