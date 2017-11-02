import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';
import VoteScore from './VoteScore'

function Post(props) {
  const { post } = props
  return (
    <div className="post" onClick={props.onSelected}>
      <div className="post-header">
        <div className="post-header-title">
          <span className={"category " + post.category} >{post.category[0].toUpperCase() + post.category.slice(1)}</span> {post.title}
        </div>
        <div className="post-header-published">
          <span className="published">{Moment(post.timestamp).from(new Date())}</span>
        </div>
      </div>
      <div className="post-header-author">by {post.author}</div>
      <div className="post-body">{post.body}</div>
      <div className="post-footer">
        <VoteScore voteScore={post.voteScore} />
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }),
  onSelected: PropTypes.func.isRequired
}

export default Post