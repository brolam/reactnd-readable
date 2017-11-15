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
    goBack = e => { },
    goEditPost = post => { },
    onSaveEditedPost = (fieldsWasValidated, post) => { },
    onClickDelPost = (postId) => { },
    onDeletePost = (postId) => { },
    onVoteScorePost = (postId, option) => { },
    goPostNewComment = (postId) => { },
    goPostEditComment = (postId, commentId) => { },
    goPostDeleteComment = (postId, commentId) => { },
    onSaveComment = (postId, comment) => { },
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
            onClick={e => goEditPost(post)}>Edit</button>
          <button className="delete-button"
            onClick={e => { onClickDelPost(post.id) }}>Delete</button>
          <VoteScore
            voteScore={post.voteScore}
            onClickLiked={e => onVoteScorePost(post.id, 'upVote')}
            onClickNotLiked={e => onVoteScorePost(post.id, 'downVote')}
          />
        </div>
      </div>
      <div className="post-content">
        <PostCommentBody post={post} />
        <PostCommentList
          post={post}
          comments={comments}
          onSelectedEditComment={goPostEditComment}
          onSelectedDeleteComment={goPostDeleteComment} />
      </div>
      {
        (isNewComment || isEditComment) && (
          <PostCommentModal
            post={post}
            comment={isNewComment ? {} : selectedComment}
            onClickBackButton={goBack}
            onSave={(postId, comment) => { onSaveComment(postId, comment) }}
          />
        )}
      {
        isShowQuestionDelPost && (
          <QuestionModal
            message={"Are you sure? Do you want delete this post? "}
            timeout={4000}
            onYesAnswer={e => { onDeletePost(post.id) }}
            onNoAnswer={goBack}
          />
        )}
      {
        isShowQuestionDelComment && (
          <QuestionModal
            message={"Are you sure? Do you want delete this comment?"}
            timeout={4000}
            onYesAnswer={e => { }}
            onNoAnswer={ goBack }
          />
        )}
      {
        isEditPost && (
          <PostModal
            post={post}
            categories={[]}
            onClickBackButton={goBack}
            onSavePost={onSaveEditedPost}
          />
        )}
      <div
        key="flat-button"
        className="flat-button"
        onClick={e => { goPostNewComment(post.id) }} >
        <a className={"add " + post.category} >Add Comment</a>
      </div>
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