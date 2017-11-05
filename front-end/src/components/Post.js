import React from 'react'
import VoteScore from '../components/VoteScore'
import PostCommentBody from '../components/PostCommentBody'
import PostCommentList from '../components/PostCommentList'
import PostModal from '../components/PostModal'
import PostCommentModal from '../components/PostCommentModal'
import QuestionModal from '../components/QuestionModal'

function Post(
  { post,
    comments,
    isEditPost = false,
    isNewComment = false,
    isEditComment = false,
    selectedComment = {},
    showDeletePostQuestionModal = false,
    isShowQuestionDelComment = false
    }) {
  return (
    <div className="app">
      <div className="post-page-header">
        <a className="post-page-header-back"
          onClick={e => { }}>Back
      </a>
        <div className="post-page-header-title">
          <span className={post.category} >{post.category}</span>
          <span>{post.title}</span>
        </div>
        <div className="post-page-header-buttons">
          <button className="edit-button" href="/"
            onClick={e => { }}>Edit</button>
          <button className="delete-button"
            onClick={e => { }}>Delete</button>
          <VoteScore voteScore={post.voteScore} />
        </div>
      </div>
      <div className="post-content">
        <PostCommentBody post={post} />
        <PostCommentList post={post} comments={comments} />
      </div>
      {
        (isNewComment || isEditComment) && (
          <PostCommentModal
            post={post}
            comment={isNewComment ? {} : selectedComment}
            onClickBackButton={e => { }}
            onSave={e => { }}
          />
        )}
      {
        showDeletePostQuestionModal && (
          <QuestionModal
            message={"Are you sure? Do you want delete this post? "}
            timeout={7000}
            onYesAnswer={e => { }}
            onNoAnswer={e => { }}
          />
        )}
      {
        isShowQuestionDelComment && (
          <QuestionModal
            message={"Are you sure? Do you want delete this comment?"}
            timeout={7000}
            onYesAnswer={e => { }}
            onNoAnswer={e => { }}
          />
        )}
      {
        isEditPost && (
          <PostModal
            post={post}
            categories={[]}
            onClickBackButton={e => { }}
            onSave={e => { }}
          />
        )}
    </div>

  )
}

export default Post