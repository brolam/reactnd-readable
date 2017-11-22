import React from 'react'
import VoteScore from '../components/VoteScore'
import PostCommentBody from '../components/PostCommentBody'
import PostCommentList from '../components/PostCommentList'
import PostModal from '../components/PostModal'
import PostCommentModal from '../components/PostCommentModal'
import QuestionModal from '../components/QuestionModal'
import WaitProcessModal from '../components/WaitProcessModal'
import ErrorMessageModal from '../components/ErrorMessageModal'

function PostPage(
  { post = getEmptyPost(),
    comments = [],
    commentsOrder,
    selectedComment = {},
    isEditPost = false,
    isNewComment = false,
    isEditComment = false,
    isShowQuestionDelPost = false,
    isShowQuestionDelComment = false,
    isShowWaitProcessModal = false,
    goHome = e => { },
    goBack = e => { },
    goPostEdit = post => { },
    goPostNewComment = (post) => { },
    goPostEditComment = (post, commentId) => { },
    goPostDelete = (post) => { },
    goPostDeleteComment = (post, commentId) => { },
    onSavePostEdited = (fieldsWasValidated, post) => { },
    onSavePostComment = (post, comment) => { },
    onDeletePost = (postId) => { },
    onDeletePostComment = (post, commentId) => { },
    onVoteScorePost = (postId, option) => { },
    onVoteScorePostComment = (postId, commentId, option) => { },
    onChangeOrderCommentsList = (order) => { } }) {
  if (!isShowWaitProcessModal && !post.id)
    return (<ErrorMessageModal message="Post was not found!" />)
  else
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
              onClick={e => goPostEdit(post)}>Edit</button>
            <button className="delete-button"
              onClick={e => { goPostDelete(post) }}>Delete</button>
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
            onSelectedDeleteComment={goPostDeleteComment}
            onVoteScorePostComment={onVoteScorePostComment}
            onChangeOrderCommentsList={onChangeOrderCommentsList}
            selectedCommentsOrder={commentsOrder} />
        </div>
        {
          (isNewComment || isEditComment) && (
            <PostCommentModal
              post={post}
              comment={isNewComment ? {} : selectedComment}
              onClickBackButton={goBack}
              onSave={(post, comment) => { onSavePostComment(post, comment) }}
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
              onYesAnswer={e => onDeletePostComment(post, selectedComment.id)}
              onNoAnswer={goBack}
            />
          )}
        {
          isEditPost && (
            <PostModal
              post={post}
              categories={[]}
              onClickBackButton={goBack}
              onSavePost={onSavePostEdited}
            />
          )}
        <div
          key="flat-button"
          className="flat-button"
          onClick={e => { goPostNewComment(post) }} >
          <a className={"add " + post.category} >Add Comment</a>
        </div>
        {
          isShowWaitProcessModal && (
            <WaitProcessModal
              message="Please wait while the information is updated."
            />
          )
        }
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