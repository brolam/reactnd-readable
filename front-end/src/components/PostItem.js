import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';
import VoteScore from './VoteScore'
import { capitalize } from '../components/utils/Helpers'

function PostItem(props) {
  const { post } = props
  return (
    <div className="post" onClick={props.onSelected}>
      <div className="post-header">
        <div className="post-header-title">
          <span className={"category " + post.category} >{capitalize(post.category)}</span> {post.title}
        </div>
        <div className="post-header-published">
          <span className="published">{Moment(post.timestamp).from(new Date())}</span>
        </div>
      </div>
      <div className="post-header-author">by {post.author}</div>
      <div className="post-body">{post.body}</div>
      <div className="post-footer">
        <button className="edit-button" href="/"
          onClick={e => {
            e.stopPropagation()
            props.goPostEdit(post)
          }}>Edit</button>
        <button className="delete-button"
          onClick={e => {
            e.stopPropagation()
            props.goPostDelete(post.id)
          }
          }>Delete</button>
        <VoteScore
          voteScore={post.voteScore}
          onClickLiked={e => {
            e.stopPropagation()
            props.onVoteScorePost(post.id, 'upVote')
          }}
          onClickNotLiked={e => {
            e.stopPropagation()
            props.onVoteScorePost(post.id, 'downVote')
          }}
        />
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }),
  onSelected: PropTypes.func.isRequired
}

export default PostItem