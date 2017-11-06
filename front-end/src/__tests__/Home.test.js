import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Home from '../components/Home'

const categories = global.dataForTest.categories

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

const posts = [{
  category: "udacity",
  id: "7ni6ok3ym7mf1p33lnez",
  title: "Udacity is the best place to learn technology.",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
},
{
  category: "react",
  id: "8xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn React",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}]

