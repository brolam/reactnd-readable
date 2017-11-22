import React from 'react'
import OrderOptions from './OrderOptions'
import PostCommentItem from './PostCommentItem'

function PostCommentList({
  post,
  comments,
  selectedCommentsOrder,
  onSelectedEditComment = (postId, commentId) => { },
  onSelectedDeleteComment = (postId, commentId) => { },
  onVoteScorePostComment = (postId, commentId, option) => { },
  onChangeOrderCommentsList = (order) => { } }) {
  return ([
    <div key="title" className="post-comments-title">
      <span>Commentes({comments.length})</span>
      <OrderOptions
        onChangeOrder={onChangeOrderCommentsList}
        selectedValue={selectedCommentsOrder}
      />
    </div>,
    <div key="comments" className={"post-page-comments"}>
      {comments.map(comment => (
        <PostCommentItem
          key={comment.id}
          post={post}
          comment={comment}
          onClickEditButton={e => { onSelectedEditComment(post, comment.id) }}
          onClickDeleteButton={e => { onSelectedDeleteComment(post, comment.id) }}
          onVoteScorePostComment={onVoteScorePostComment}
        />
      ))}
    </div>
  ])
}

export default PostCommentList