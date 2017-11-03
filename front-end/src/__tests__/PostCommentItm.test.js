import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme';
import PostCommentItem from '../components/PostCommentItem'

test('render without error', () => {
  ReactDOM.render(
    <PostCommentItem
      comment={comment}
      onClickEditButton={e => { }}
      onClickDeleteButton={e => { }}
    />, document.createElement('div'));
})

test('on click Edit button', () => {
  let isClickedEditButton = false;
  const postCommentItem = mount(
    <PostCommentItem
      comment={comment}
      onClickEditButton={e => { isClickedEditButton = true }}
      onClickDeleteButton={e => { }}
    />);
  postCommentItem.find('button [className="edit-button"]').simulate('click')
  expect(isClickedEditButton).toBe(true);
})

test('on click Delete button', () => {
  let isClickedDeleteButton = false;
  const postCommentItem = mount(
    <PostCommentItem
      comment={comment}
      onClickDeleteButton={e => { isClickedDeleteButton = true }}
      onClickEditButton={e => { }}
    />);
  postCommentItem.find('button [className="delete-button"]').simulate('click')
  expect(isClickedDeleteButton).toBe(true);
})

test('last Snapshot', () => {
  const postCommentItem = renderer.create(
    <PostCommentItem
      comment={comment}
      onClickEditButton={e => { }}
      onClickDeleteButton={e => { }}
    />);
  let tree = postCommentItem.toJSON();
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
