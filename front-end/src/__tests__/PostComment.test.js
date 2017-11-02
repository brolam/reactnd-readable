import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme';
import PostComment from '../components/PostComment'

test('render without error', () => {
  ReactDOM.render(<PostComment comment={comment} />, document.createElement('div'));
})

test('on click Edit button', () => {
  let isClickedEditButton = false;
  const postComment = mount(<PostComment comment={comment} onClickEditButton={ e =>{ isClickedEditButton = true} } />);
  postComment.find('button [className="edit-button"]').simulate('click')
  expect(isClickedEditButton).toBe(true);
})

const comment ={
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  }
