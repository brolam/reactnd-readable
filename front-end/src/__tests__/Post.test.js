import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Post from '../components/Post'

test('render without error', () => {
  ReactDOM.render(<Post post={postUdacity} onSelected={ e =>{} } />, document.createElement('div'));
})

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