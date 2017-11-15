import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import pathToRegexp from 'path-to-regexp'
import './App.css';
import HomePage from './components/HomePage'
import PostPage from './components/PostPage'
import { clearQuestionModalTimeout } from './components/QuestionModal'
import {
  requestPosts,
  requestSavePost,
  requestPost,
  requestDeletePost,
  requestVoteScorePost,
  requestSaveComment,
  cleanRedirectUrl,
} from './store/actions'

const GO_HOME = '/';
//GET Post
const GO_POST_NEW = '/posts/new';
const GO_POST_GET = '/posts/:id/:action/:commentId?/:commentAction?/';
const POST_URL_ACTIONS = {
  get: 'get',
  edit: 'edit',
  deletePost: 'delete',
  comments: 'comments'
}

const COMMENT_URL_ACTIONS = {
  new: 'new',
  edit: 'edit',
  delete: 'delete',
}

const getUrlPost = pathToRegexp.compile(GO_POST_GET)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const currentUrl = this.props.location.pathname
    //to list all posts at the first render
    this.props.dispatchRequestPosts(this.props.search)
    //Refresh the post page if the user entered the url manually
    if (this.isUserWroteUrlToGePost(currentUrl)) this.refreshPostPage(this.props.location.pathname)

  }

  componentWillReceiveProps() {
    if (this.isThereOneRedirectRequest()) {
      this.doRedirectRequest()
    }
  }

  componentWillUpdate() {
    clearQuestionModalTimeout()
  }

  render() {
    return (
      <Switch>
        <Route exact path={GO_HOME} render={({ history }) => (
          <HomePage {...this.props} />
        )} />
        <Route exact path={GO_POST_NEW} render={({ history }) => (
          <HomePage isNewPost={true}  {...this.props} />
        )} />
        <Route exact path={GO_POST_GET} render={({ history }) => (
          <PostPage
            {...this.getPostPagePropsByUrl(history.location.pathname) }
            {...this.props.selectedPost}
            {...this.props} />
        )} />
      </Switch >
    )
  }

  isPostPageUrl(url) {
    if (url.endsWith('/new')) return false
    return (pathToRegexp(GO_POST_GET).test(url))
  }

  getPostPagePropsByUrl(url) {
    if (!this.isPostPageUrl(url)) return {}
    const params = pathToRegexp(GO_POST_GET).exec(url)
    const postAction = params[2], commentId = params[3], commentAction = params[4]
    const comments = commentId ? this.props.selectedPost.comments : []
    return ({
      isEditPost: postAction === POST_URL_ACTIONS.edit,
      isShowQuestionDelPost: postAction === POST_URL_ACTIONS.deletePost,
      isNewComment: (
        postAction === POST_URL_ACTIONS.comments &&
        commentId === COMMENT_URL_ACTIONS.new
      ),
      isEditComment: (
        postAction === POST_URL_ACTIONS.comments &&
        commentAction === COMMENT_URL_ACTIONS.edit
      ),
      isShowQuestionDelComment: (
        postAction === POST_URL_ACTIONS.comments &&
        commentAction === COMMENT_URL_ACTIONS.delete
      ),
      selectedComment: comments.find(comment => comment.id === commentId)
    })
  }

  isUserWroteUrlToGePost(currentUrl) {
    return this.isPostPageUrl(currentUrl)
  }

  refreshPostPage(currentUrl) {
    if (!this.isPostPageUrl(currentUrl)) return
    const params = pathToRegexp(GO_POST_GET).exec(currentUrl)
    this.props.dispatchRequestPost(params[1])
  }

  isThereOneRedirectRequest() {
    if (!this.props.redirectUrl) return false
    return (this.props.redirectUrl !== this.props.location.pathname)
  }

  doRedirectRequest() {
    this.props.cleanRedirectUrl()
    this.props.history.push(this.props.redirectUrl)
  }
}

function mapStateToProps({ appProps }, ownProps) {
  return appProps;
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    //dispatchs
    dispatchRequestPosts: (search) => dispatch(requestPosts(search)),
    dispatchRequestPost: (postId) => dispatch(requestPost(postId)),
    cleanRedirectUrl: () => dispatch(cleanRedirectUrl()),
    onSavePost: (fieldsWasValidated, post) => {
      fieldsWasValidated && dispatch(requestSavePost(post, GO_HOME))
    },
    onSaveEditedPost: (fieldsWasValidated, post) => {
      const redirectUrl = getUrlPost({ id: post.id, action: POST_URL_ACTIONS.get })
      fieldsWasValidated && dispatch(requestSavePost(post, redirectUrl))
    },
    onDeletePost: (postId) => dispatch(requestDeletePost(postId, GO_HOME)),
    onVoteScorePost: (postId, option) => dispatch(requestVoteScorePost(postId, option)),
    onSaveComment: (postId, comment) => {
      const redirectUrl = getUrlPost({ id: postId, action: POST_URL_ACTIONS.get })
      dispatch(requestSaveComment(postId, comment, redirectUrl))
    },
    //pushs
    onClickNewPost: (e) => ownProps.history.push(GO_POST_NEW),
    goHome: (e) => ownProps.history.push(GO_HOME),
    goBack: (e) => ownProps.history.goBack(),
    goEditPost: post => {
      ownProps.history.push(getUrlPost({ id: post.id, action: POST_URL_ACTIONS.edit }))
    },
    goPostNewComment: (postId) => {
      const urlNewComment = getUrlPost({
        id: postId,
        action: POST_URL_ACTIONS.comments,
        commentId: COMMENT_URL_ACTIONS.new
      })
      ownProps.history.push(urlNewComment)
    },
    goPostEditComment: (postId, commentId) => {
      const urlEditComment = getUrlPost({
        id: postId,
        action: POST_URL_ACTIONS.comments,
        commentId: commentId,
        commentAction: COMMENT_URL_ACTIONS.edit
      })
      ownProps.history.push(urlEditComment)
    },
    goPostDeleteComment: (postId, commentId) => {
      const urlDeleteComment = getUrlPost({
        id: postId,
        action: POST_URL_ACTIONS.comments,
        commentId: commentId,
        commentAction: COMMENT_URL_ACTIONS.delete
      })
      ownProps.history.push(urlDeleteComment)
    },
    //Pushs and dispatchs
    onSelectedPost: (post) => {
      ownProps.history.push(getUrlPost({ id: post.id, action: POST_URL_ACTIONS.get }))
      dispatch(requestPost(post.id))
    },
    onClickDelPost: (postId) => { ownProps.history.push(getUrlPost({ id: postId, action: POST_URL_ACTIONS.deletePost })) }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))