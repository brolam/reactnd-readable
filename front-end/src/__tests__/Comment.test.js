import React from 'react'
import ReactDOM from 'react-dom'
import Comment from '../components/Comment'

test('render without error', () => {
  ReactDOM.render(<Comment comment={comment} />, document.createElement('div'));
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
