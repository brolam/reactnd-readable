import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';
import VoteScore from './VoteScore'

function Comment(props) {
  const { comment } = props
  return (
    <div className="post-comment" >
      <div className="post-comment-author">
        by {comment.author} {Moment(comment.timestamp).from(new Date())}
      </div>
      <div>{comment.body}</div>
      <div className="post-comment-footer">
        <button className="edit-button" href="/" onClick={e => { }}>Edit</button>
        <button className="delete-button" onClick={e => { }}>Delete</button>
        <VoteScore voteScore={comment.voteScore}
        />
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  })
}

export default Comment