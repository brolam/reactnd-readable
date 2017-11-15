import React from 'react'
import OrderOptions from './OrderOptions'
import PostCommentItem from './PostCommentItem'

function PostCommentList({ post, comments, goPostEditComment }) {
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
          onClickEditButton={e => { goPostEditComment(post.id, comment.id) }}
          onClickDeleteButton={e => { }}
        />
      ))}
    </div>
  ])
}

export default PostCommentList