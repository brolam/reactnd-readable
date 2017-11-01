import React from 'react'
import ReactDOM from 'react-dom'
import VoteScore from '../components/VoteScore'

test('render without error', () => {
  ReactDOM.render(
    <VoteScore
      entityType="post"
      entityId="8xf0y6ziyjabvozdd253nd"
      voteScore={5}
    />, document.createElement('div'));
})