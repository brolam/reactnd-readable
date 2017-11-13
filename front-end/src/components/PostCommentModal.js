import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';
import { parseReportValidityMethod } from './utils/FormReportValidity'

let inputBody

function PostCommentModal(props) {
  const { post, comment, onClickBackButton, onSave } = props

  function parseFields(e) {
    parseReportValidityMethod(inputBody)
    if (inputBody.reportValidity()) {
      const commentNew = buildNewComment(post.id, inputBody.value)
      onSave(post.id, commentNew)
    }
  }
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
            ref={(textarea) => { inputBody = textarea; }}
            placeholder="Body comment"
            defaultValue={comment.body}
            autoFocus
            required
          />
          <div className="modal-footer">
            <button className={"save-button " + post.category} href="/"
              onClick={parseFields}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function buildNewComment(postId, body){
  return {
    timestamp: new Date().getTime(),
    body,
    author: 'Breno Marques',
    parentId: postId
  }
}

function isNewComment(comment) {
  return comment.id ? false : true
}

PostCommentModal.propTypes = {
  post: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  comment: PropTypes.shape({}).isRequired,
  onClickBackButton: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default PostCommentModal