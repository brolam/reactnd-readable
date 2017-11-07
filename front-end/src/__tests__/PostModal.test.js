import React from 'react'
import ReactDOM from 'react-dom'
import PostModal from '../components/PostModal'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

const categories = global.dataForTest.categories

test('render without error', () => {
  ReactDOM.render(
    <PostModal
      post={postUdacity}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />, document.createElement('div'));
})

test('last Snapshot to new Post', () => {
  const postModal = renderer.create(
    <PostModal
      post={{}}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />);
  let tree = postModal.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot to edit Post', () => {
  const postModal = renderer.create(
    <PostModal
      post={postUdacity}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />);
  let tree = postModal.toJSON();
  expect(tree).toMatchSnapshot();
})

test('on click back button', () => {
  let isClikedBackButton = false;
  const postModal = mount(
    <PostModal
      post={postUdacity}
      onClickBackButton={e => { isClikedBackButton = true }}
      categories={categories}
      onSave={e => { }}
    />);
  postModal.find('div [className="modal-heard modal-post"] span').simulate('click')
  expect(isClikedBackButton).toBe(true);
})

test('on save event to new Post', () => {
  let wasSaveEnvent = false;
  const postModal = mount(
    <PostModal
      post={{}}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { wasSaveEnvent = true }}
    />);
  postModal.find('select').simulate('change');
  expect(wasSaveEnvent).toBe(true);
})

test('on save event to Edit Post', () => {
  let wasSaveEnvent = false;
  const postModal = mount(
    <PostModal
      post={postUdacity}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { wasSaveEnvent = true }}
    />);
  postModal.find('button [className="save-button udacity"]').simulate('click');
  expect(wasSaveEnvent).toBe(true);
})

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