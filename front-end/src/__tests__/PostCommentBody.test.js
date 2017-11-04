import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import PostCommentBody from '../components/PostCommentBody'

test('render without error', () => {
  ReactDOM.render(
    <PostCommentBody post={postRedux} />, document.createElement('div'));
})

test('last Snapshot', () => {
  const postCommentBody = renderer.create(<PostCommentBody post={postRedux} />);
  let tree = postCommentBody.toJSON();
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