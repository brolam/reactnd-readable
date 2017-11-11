import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import HomePage from '../components/HomePage'

const categories = global.dataForTest.categories
const posts = global.dataForTest.posts

test('render without error', () => {
  ReactDOM.render(
    <HomePage posts={posts} categories={categories} />,
    document.createElement('div'));
})

test('last Snapshot', () => {
  const homePage = renderer.create(<HomePage posts={posts} categories={categories} />);
  let tree = homePage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show new post form modal', () => {
  const homePage = renderer.create(<HomePage isNewPost={true} posts={posts} categories={categories} />);
  let tree = homePage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show message wait process modal', () => {
  const homePage = renderer.create(
  <HomePage 
  posts={[]} 
  categories={[]}
  isShowWaitProcessModal={true}
   />);
  let tree = homePage.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot - show error message modal', () => {
  const homePage = renderer.create(
  <HomePage 
  posts={[]} 
  categories={[]}
  isShowErrorMessageModal={{message:"An error happened, please try again."}}
   />);
  let tree = homePage.toJSON();
  expect(tree).toMatchSnapshot();
})