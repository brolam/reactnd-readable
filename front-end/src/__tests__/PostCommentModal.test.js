import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import PostCommentModal from '../components/PostCommentModal'

test('render without error', () => {
  ReactDOM.render(
    <PostCommentModal
      post={postUdacity}
      comment={comment}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />, document.createElement('div'));
})

test('last Snapshot to new comment', () => {
  const postCommentModal = renderer.create(
    <PostCommentModal
      post={postUdacity}
      comment={{}}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />);
  let tree = postCommentModal.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot to edit comment', () => {
  const postCommentModal = renderer.create(
    <PostCommentModal
      post={postUdacity}
      comment={comment}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />);
  let tree = postCommentModal.toJSON();
  expect(tree).toMatchSnapshot();
})

test('input body is focusing', () => {
  const postCommentModal = mount(
    <PostCommentModal
      post={postUdacity}
      comment={comment}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />);
  const elementFocusing = document.activeElement
  const inputBody = postCommentModal.find('textarea')
  expect(inputBody.instance() === elementFocusing).toBe(true);
})


test('on click back button', () => {
  let isClikedBackButton = false;
  const postCommentModal = mount(
    <PostCommentModal
      post={postUdacity}
      comment={comment}
      onClickBackButton={e => { isClikedBackButton = true }}
      onSave={() => { }}
    />);
  postCommentModal.find('div [className="modal-heard"] span').simulate('click')
  expect(isClikedBackButton).toBe(true);
})

test('on save event', () => {
  let wasSaveEnvent = false;
  const postCommentModal = mount(
    <PostCommentModal
      post={postUdacity}
      comment={comment}
      onClickBackButton={e => { }}
      onSave={() => { wasSaveEnvent = true }}
    />);
  const inputBody = postCommentModal.find('textarea')
  inputBody.instance().value = 'New comment body'
  postCommentModal.find('button [className="save-button udacity"]').simulate('click')
  expect(wasSaveEnvent).toBe(true);
})

test('body is required', () => {
  let isBodyFieldInvalid = true
  const postCommentModal = mount(
    <PostCommentModal
      post={postUdacity}
      comment={comment}
      onClickBackButton={e => { }}
      onSave={() => {
        isBodyFieldInvalid = false 
      }}
    />);
  const inputBody = postCommentModal.find('textarea')
  inputBody.instance().value = ' '
  postCommentModal.find('button [className="save-button udacity"]').simulate('click');
  expect(isBodyFieldInvalid).toBe(true);
})

const comment = {
  id: '894tuq4ut84ut8v4t8wun89g',
  parentId: "7ni6ok3ym7mf1p33lnez",
  timestamp: 1468166872634,
  body: 'Hi there! I am a COMMENT.',
  author: 'thingtwo',
  voteScore: 6,
  deleted: false,
  parentDeleted: false
}

const postUdacity = {
  category: "udacity",
  id: "7ni6ok3ym7mf1p33lnez",
  title: "Udacity is the best place to learn technology.",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}
