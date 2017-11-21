import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme';
import PostItem from '../components/PostItem'

test('render without error', () => {
  ReactDOM.render(<PostItem post={postUdacity} onSelected={ e =>{} } />, document.createElement('div'));
})

test('last Snapshot', () => {
  const postItem = renderer.create(<PostItem post={postUdacity} onSelected={ e =>{} } />);
  let tree = postItem.toJSON();
  expect(tree).toMatchSnapshot();
})

test('on selected post', () => {
  let isSelectedPost = false;
  const postItem = mount(<PostItem post={postUdacity} onSelected={ e =>{ isSelectedPost = true} } />);
  postItem.find('div [className="post"]').simulate('click')
  expect(isSelectedPost).toBe(true);
})

const postUdacity = {
  category: "udacity",
  id: "7ni6ok3ym7mf1p33lnez",
  title: "Udacity is the best place to learn technology.",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5,
  countComments: 2,
}