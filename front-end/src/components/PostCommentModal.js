import React from 'react'
import PropTypes from 'prop-types'

function PostCommentModal(props) {
  const { post, comment } = props
  return (
    <div id="commentModal" className="modal modal-open">
      <div className="modal-dialog">
        <div className="modal-heard">
          <span onClick={e=>{}} />
          <h1>New comment</h1>
        </div>
        <div className="modal-content modal-comment">
          <textarea id="commentModalBody" placeholder="Body comment" />
          <div className="modal-footer">
            <button className={"save-button " + post.category} href="/"
              onClick={e=>{}}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

PostCommentModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
}

export default PostCommentModal