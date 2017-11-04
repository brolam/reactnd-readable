import React from 'react'
import Moment from 'moment';

function PostCommentBody({ post }) {
  return (
    <div className={"post-page-body"}>
      <div className="post-page-author" >by {post.author} {Moment(post.timestamp).from(new Date())}</div>
      {post.body}
    </div>
  )
}

export default PostCommentBody