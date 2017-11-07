import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Home from '../components/Home'

const categories = global.dataForTest.categories
const posts = global.dataForTest.posts

test('render without error', () => {
  ReactDOM.render(
    <Home posts={posts} categories={categories} />,
    document.createElement('div'));
})

test('last Snapshot', () => {
  const home = renderer.create(<Home posts={posts} categories={categories} />);
  let tree = home.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show new post form modal', () => {
  const home = renderer.create(<Home isNewPost={true} posts={posts} categories={categories} />);
  let tree = home.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show message wait process modal', () => {
  const home = renderer.create(
  <Home 
  posts={[]} 
  categories={[]}
  isShowWaitProcessModal={true}
   />);
  let tree = home.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show error message modal', () => {
  const home = renderer.create(
  <Home 
  posts={[]} 
  categories={[]}
  isShowErrorMessageModal={{message:"An error happened, please try again."}}
   />);
  let tree = home.toJSON();
  expect(tree).toMatchSnapshot();
})