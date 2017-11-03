import React from 'react'
import PropTypes from 'prop-types'

function PostCommentModal(props) {
  const { post, comment, onClickBackButton , onSave } = props
  return (
    <div id="commentModal" className="modal modal-open">
      <div className="modal-dialog">
        <div className="modal-heard">
          <span onClick={onClickBackButton} />
          <h1>
            {isNewComment(comment) ? 'New comment' : 'Edit comment'}
          </h1>
        </div>
        <div className="modal-content modal-comment">
          <textarea id="commentModalBody" placeholder="Body comment" />
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
  return comment.id ? true : false
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