import React from 'react'
import ReactDOM from 'react-dom'
import PostModal from '../components/PostModal'
import renderer from 'react-test-renderer'

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

const categories = ['udacity', 'react', 'redux']

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