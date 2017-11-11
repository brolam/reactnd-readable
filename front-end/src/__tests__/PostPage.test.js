import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import PostPage from '../components/PostPage'

test('render without error', () => {
  ReactDOM.render(
    <PostPage post={postRedux} comments={postReduxComments} />,
    document.createElement('div'));
})

test('last Snapshot', () => {
  const postPage = renderer.create(<PostPage post={postRedux} comments={postReduxComments} />);
  let tree = postPage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - Edit Post', () => {
  const postPage = renderer.create(<PostPage
    post={postRedux}
    comments={postReduxComments}
    isEditPost={true} />);
  let tree = postPage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - New Comment', () => {
  const postPage = renderer.create(<PostPage
    post={postRedux}
    comments={postReduxComments}
    isNewComment={true}
  />);
  let tree = postPage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - Edit Comment', () => {
  const postPage = renderer.create(<PostPage
    post={postRedux}
    comments={postReduxComments}
    isEditComment={true}
    selectedComment={postReduxComments[0]}
  />);
  let tree = postPage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show question delete comment', () => {
  const postPage = renderer.create(<PostPage
    post={postRedux}
    comments={postReduxComments}
    isShowQuestionDelComment={true}
    selectedComment={postReduxComments[0]}
  />);
  let tree = postPage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show question delete post', () => {
  const postPage = renderer.create(<PostPage
    post={postRedux}
    comments={postReduxComments}
    isShowQuestionDelPost={true}
  />);
  let tree = postPage.toJSON();
  expect(tree).toMatchSnapshot();
})

const postRedux = {
  category: "redux",
  id: "7xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn Redux",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}

const postReduxComments = [
  {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
]


