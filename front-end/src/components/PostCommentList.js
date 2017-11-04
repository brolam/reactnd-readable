import React from 'react'
import OrderOptions from './OrderOptions'
import PostCommentItem from './PostCommentItem'

function PostCommentList({ post, comments }) {
  return ([
    <div key="title" className="post-comments-title">
      <span>Commentes({comments.length})</span>
      <OrderOptions />
    </div>,
    <div key="comments" className={"post-page-comments"}>
      {comments.map(comment => (
        <PostCommentItem
          key={comment.id}
          comment={comment}
          onClickEditButton={e => { }}
          onClickDeleteButton={e => { }}
        />
      ))}
    </div>,
    <div key="flat-button" className="flat-button" onClick={e => { }} >
      <a className={"add " + post.category} >Add Comment</a>
    </div>
  ])
}

export default PostCommentList