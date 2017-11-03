import React from 'react'
import ReactDOM from 'react-dom'
import PostCommentModal from '../components/PostCommentModal'

test('render without error', () => {
  ReactDOM.render(<PostCommentModal post={postUdacity} comment={comment} />, document.createElement('div'));
})

const comment = {
  id: '894tuq4ut84ut8v4t8wun89g',
  parentId: "7ni6ok3ym7mf1p33lnez",
  timestamp: 1468166872634,
  body: 'Hi there! I am a COMMENT.',
  author: 'thingtwo',
  voteScore: 6,
  deleted: false,
  parentDeleted: false
}

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