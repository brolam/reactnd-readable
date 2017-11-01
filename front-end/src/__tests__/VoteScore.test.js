import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme';
import VoteScore from '../components/VoteScore'

test('render without error', () => {
  ReactDOM.render(
    <VoteScore
      entityType="post"
      entityId="8xf0y6ziyjabvozdd253nd"
      voteScore={5}
    />, document.createElement('div'));
})

test('last Snapshot', () => {
  const voteScore = renderer.create(
    <VoteScore
      entityType="post"
      entityId="8xf0y6ziyjabvozdd253nd"
      voteScore={5}
    />
  );
  let tree = voteScore.toJSON();
  expect(tree).toMatchSnapshot();
})