import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme';
import PostComment from '../components/PostComment'

test('render without error', () => {
  ReactDOM.render(
    <PostComment
      comment={comment}
      onClickEditButton={e => { }}
      onClickDeleteButton={e => { }}
    />, document.createElement('div'));
})

test('on click Edit button', () => {
  let isClickedEditButton = false;
  const postComment = mount(
    <PostComment
      comment={comment}
      onClickEditButton={e => { isClickedEditButton = true }}
      onClickDeleteButton={e => { }}
    />);
  postComment.find('button [className="edit-button"]').simulate('click')
  expect(isClickedEditButton).toBe(true);
})

test('on click Delete button', () => {
  let isClickedDeleteButton = false;
  const postComment = mount(
    <PostComment
      comment={comment}
      onClickDeleteButton={e => { isClickedDeleteButton = true }}
      onClickEditButton={e => { }}
    />);
  postComment.find('button [className="delete-button"]').simulate('click')
  expect(isClickedDeleteButton).toBe(true);
})

test('last Snapshot', () => {
  const postComment = renderer.create(
    <PostComment
      comment={comment}
      onClickEditButton={e => { }}
      onClickDeleteButton={e => { }}
    />);
  let tree = postComment.toJSON();
  expect(tree).toMatchSnapshot();
})


const comment = {
  id: '894tuq4ut84ut8v4t8wun89g',
  parentId: "8xf0y6ziyjabvozdd253nd",
  timestamp: 1468166872634,
  body: 'Hi there! I am a COMMENT.',
  author: 'thingtwo',
  voteScore: 6,
  deleted: false,
  parentDeleted: false
}
