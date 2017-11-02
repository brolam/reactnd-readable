import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme';
import VoteScore from '../components/VoteScore'

test('render without error', () => {
  ReactDOM.render(<VoteScore voteScore={5} />, document.createElement('div'));
})

test('last Snapshot', () => {
  const voteScore = renderer.create(<VoteScore voteScore={5} />);
  let tree = voteScore.toJSON();
  expect(tree).toMatchSnapshot();
})

test('on click liked button', () => {
  let isClickedLikedButton = false;
  const voteScore = mount(<VoteScore voteScore={5} onClickLiked={e => { isClickedLikedButton = true; }} />);
  voteScore.find('button [className="liked"]').simulate('click')
  expect(isClickedLikedButton).toBe(true);
})

test('on click not liked button', () => {
  let isClickedNotLikedButton = false;
  const voteScore = mount(<VoteScore voteScore={5} onClickNotLiked={e => { isClickedNotLikedButton = true; }} />);
  voteScore.find('button [className="not-liked"]').simulate('click')
  expect(isClickedNotLikedButton).toBe(true);
})