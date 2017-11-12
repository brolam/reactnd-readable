import React from 'react'
import VoteScore from '../components/VoteScore'
import PostCommentBody from '../components/PostCommentBody'
import PostCommentList from '../components/PostCommentList'
import PostModal from '../components/PostModal'
import PostCommentModal from '../components/PostCommentModal'
import QuestionModal from '../components/QuestionModal'

function PostPage(
  { post = getEmptyPost(),
    comments = [],
    isEditPost = false,
    isNewComment = false,
    isEditComment = false,
    selectedComment = {},
    isShowQuestionDelPost = false,
    isShowQuestionDelComment = false,
    goHome = e => { },
    goEditPost = post => { }
    }) {
  return (
    <div className="app">
      <div className="post-page-header">
        <a className="post-page-header-back"
          onClick={goHome}>Back
      </a>
        <div className="post-page-header-title">
          <span className={post.category} >{post.category}</span>
          <span>{post.title}</span>
        </div>
        <div className="post-page-header-buttons">
          <button className="edit-button" href="/"
            onClick={e =>goEditPost(post)}>Edit</button>
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
        isShowQuestionDelPost && (
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
            onSavePost={e => { }}
          />
        )}
    </div>

  )
}

function getEmptyPost() {
  return {
    id: null,
    title: '',
    body: '',
    category: '',
    author: '',
    timestamp: new Date(),
    voteScore: 0,
    deleted: false
  }
}

export default PostPage