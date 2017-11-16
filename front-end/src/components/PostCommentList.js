import React from 'react'
import OrderOptions from './OrderOptions'
import PostCommentItem from './PostCommentItem'

function PostCommentList({
  post,
  comments,
  onSelectedEditComment = (postId, commentId) => { },
  onSelectedDeleteComment = (postId, commentId) => { },
  onVoteScorePostComment = (postId, commentId, option) => { } }) {
  return ([
    <div key="title" className="post-comments-title">
      <span>Commentes({comments.length})</span>
      <OrderOptions />
    </div>,
    <div key="comments" className={"post-page-comments"}>
      {comments.map(comment => (
        <PostCommentItem
          key={comment.id}
          post={post}
          comment={comment}
          onClickEditButton={e => { onSelectedEditComment(post.id, comment.id) }}
          onClickDeleteButton={e => { onSelectedDeleteComment(post.id, comment.id) }}
          onVoteScorePostComment={onVoteScorePostComment}
        />
      ))}
    </div>
  ])
}

export default PostCommentList