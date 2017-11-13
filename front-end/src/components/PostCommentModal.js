import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';

function PostCommentModal(props) {
  const { post, comment, onClickBackButton , onSave } = props
  return (
    <div id="commentModal" className="modal modal-open">
      <div className="modal-dialog">
        <div className="modal-heard">
          <span onClick={onClickBackButton} />
          <h1>
            {isNewComment(comment) ? 'New comment' : `Edit comment by ${comment.author} ${Moment(comment.timestamp).from(new Date())}`}
          </h1>
        </div>
        <div className="modal-content modal-comment">
          <textarea 
          placeholder="Body comment"
          defaultValue={comment.body}
          autoFocus
           />
          <div className="modal-footer">
            <button className={"save-button " + post.category} href="/"
              onClick={onSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function isNewComment(comment) {
  return comment.id ? false : true
}

PostCommentModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  comment: PropTypes.shape({}).isRequired,
  onClickBackButton: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default PostCommentModal