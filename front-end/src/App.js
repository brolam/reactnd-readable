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
  requestPostsByCategory,
  requestSavePost,
  requestPost,
  requestDeletePost,
  requestVoteScorePost,
  requestSaveComment,
  requestDeletePostComment,
  requestVoteScorePostComment,
  requestRedirect,
  requestChangeOrderPosts,
  requestChangeOrderComments,
  requestSearchPosts,
  cleanRedirectUrl,
} from './store/actions'

//Home Url
const GO_HOME = '/';

//GET Post
const GO_POST_NEW = '/posts/new';
const GO_POST_GET = '/posts/:id/:action/:commentId?/:commentAction?/';
const POST_URL_ACTIONS = {
  get: 'get',
  edit: 'edit',
  delete: 'delete',
  comments: 'comments'
}
const COMMENT_URL_ACTIONS = {
  new: 'new',
  edit: 'edit',
  delete: 'delete',
}
const getPostPathToRegexp = pathToRegexp.compile(GO_POST_GET)
const getPostPageUrl = postId => (getPostPathToRegexp({ id: postId, action: POST_URL_ACTIONS.get }))

//GET posts by categoreis 
const GO_HOME_FILTER = '/:categoryPath/posts';
const getHomeFilterPathToRegexp = pathToRegexp.compile(GO_HOME_FILTER)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const currentUrl = this.props.location.pathname
    this.doDispatchByUrl(currentUrl)
  }

  componentWillUpdate() {
    clearQuestionModalTimeout()
  }

  componentDidUpdate() {
    if (this.isThereOneRedirectRequest()) {
      this.doRedirectRequest()
    }
  }

  render() {
    return (
      <Switch>
        {[GO_HOME_FILTER, GO_POST_NEW, GO_HOME].map(path => (
          <Route key={path} exact path={path} render={({ history }) => (
            <HomePage {...this.props} {...this.getHomePropsByUrl(history.location.pathname) } />
          )} />))
        }
        <Route exact path={GO_POST_GET} render={({ history }) => (
          <PostPage
            {...this.getPostPagePropsByUrl(history.location.pathname) }
            {...this.props.selectedPost}
            {...this.props} />
        )} />
      </Switch >
    )
  }

  isHomeUrl(url) {
    return (pathToRegexp(GO_HOME).test(url) || pathToRegexp(GO_POST_NEW).test(url))
  }

  isHomeFilterByCategoryUrl(url) {
    return (pathToRegexp(GO_HOME_FILTER).test(url))
  }

  getHomePropsByUrl(url) {
    let selectedCategoryPathFilter = 'none'
    if (this.isHomeFilterByCategoryUrl(url)) {
      const params = pathToRegexp(GO_HOME_FILTER).exec(url)
      selectedCategoryPathFilter = params[1]
    }
    return ({
      isNewPost: pathToRegexp(GO_POST_NEW).test(url) === true,
      selectedCategoryPathFilter,
    })
  }

  isPostPageUrl(url) {
    if (url.endsWith('/new')) return false
    return (pathToRegexp(GO_POST_GET).test(url))
  }

  /**
   * Returns with the PostPage Component props entered in the URL
   * @param {*} url 
   */
  getPostPagePropsByUrl(url) {
    if (!this.isPostPageUrl(url)) return {}
    const params = pathToRegexp(GO_POST_GET).exec(url)
    const postAction = params[2], commentId = params[3], commentAction = params[4]
    const comments = commentId ? this.props.selectedPost.comments : []
    return ({
      isEditPost: postAction === POST_URL_ACTIONS.edit,
      isShowQuestionDelPost: postAction === POST_URL_ACTIONS.delete,
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

  isThereOneRedirectRequest() {
    return (this.props.redirectUrl) ? true : false
  }

  doRedirectRequest() {
    const url = this.props.redirectUrl
    this.props.cleanRedirectUrl()
    this.props.history.push(url)
    //after changend the URL a dispatch will trigger 
    //to refresh the screen
    this.doDispatchByUrl(url)
  }

  /**
   * Dispatch a data request by URL to refresh the screen 
   * @param {*} url 
   */
  doDispatchByUrl(url) {
    if (this.isHomeFilterByCategoryUrl(url)) {
      const params = pathToRegexp(GO_HOME_FILTER).exec(url)
      this.props.dispatchRequestPostsByCategory(params[1])
      return
    }
    if (this.isHomeUrl(url)) {
      this.props.dispatchRequestPosts()
      return
    }
    if (this.isPostPageUrl(url)) {
      const params = pathToRegexp(GO_POST_GET).exec(url)
      this.props.dispatchRequestPost(params[1])
      return
    }
  }

}

function mapStateToProps({ appProps }, ownProps) {
  return appProps;
}

function mapDispatchToProps(dispatch, ownProps) {
  const getCurrentUrl = () => ownProps.location.pathname
  return {
    goHome: (e) => {
      ownProps.history.push(GO_HOME)
      dispatch(requestRedirect(GO_HOME))
    },
    goHomeFilterByCategory: (categoryPath) => {
      const url = (categoryPath === 'none') ? GO_HOME : getHomeFilterPathToRegexp({ categoryPath })
      dispatch(requestRedirect(url))
    },
    goBack: (e) => ownProps.history.goBack(),
    goPostNew: (e) => ownProps.history.push(GO_POST_NEW),
    goPostEdit: post => {
      ownProps.history.push(getPostPathToRegexp({ id: post.id, action: POST_URL_ACTIONS.edit }))
    },
    goPostNewComment: (postId) => {
      const urlNewComment = getPostPathToRegexp({
        id: postId,
        action: POST_URL_ACTIONS.comments,
        commentId: COMMENT_URL_ACTIONS.new
      })
      ownProps.history.push(urlNewComment)
    },
    goPostEditComment: (postId, commentId) => {
      const urlEditComment = getPostPathToRegexp({
        id: postId,
        action: POST_URL_ACTIONS.comments,
        commentId: commentId,
        commentAction: COMMENT_URL_ACTIONS.edit
      })
      ownProps.history.push(urlEditComment)
    },
    goPostDeleteComment: (postId, commentId) => {
      const urlDeleteComment = getPostPathToRegexp({
        id: postId,
        action: POST_URL_ACTIONS.comments,
        commentId: commentId,
        commentAction: COMMENT_URL_ACTIONS.delete
      })
      ownProps.history.push(urlDeleteComment)
    },
    goPostDelete: (postId) => {
      ownProps.history.push(getPostPathToRegexp(
        {
          id: postId,
          action: POST_URL_ACTIONS.delete
        }))
    },
    dispatchRequestPosts: (search) => dispatch(requestPosts()),
    dispatchRequestPost: (postId) => dispatch(requestPost(postId)),
    dispatchRequestPostsByCategory: (categoryPath) => dispatch(requestPostsByCategory(categoryPath)),
    onSelectedPost: (post) => {
      ownProps.history.push(getPostPageUrl(post.id))
      dispatch(requestPost(post.id))
    },
    onSavePost: (fieldsWasValidated, post) => {
      fieldsWasValidated && dispatch(requestSavePost(post, GO_HOME))
    },
    onSavePostComment: (postId, comment) => {
      const redirectUrl = getPostPageUrl(postId)
      dispatch(requestSaveComment(postId, comment, redirectUrl))
    },
    onSavePostEdited: (fieldsWasValidated, post) => {
      const redirectUrl = getPostPageUrl(post.id)
      dispatch(requestSavePost(post, redirectUrl))
    },
    onDeletePost: (postId) => dispatch(requestDeletePost(postId, GO_HOME)),
    onDeletePostComment: (postId, commentId) => {
      const redirectUrl = getPostPageUrl(postId)
      dispatch(requestDeletePostComment(postId, commentId, redirectUrl))
    },
    onVoteScorePost: (postId, option) => {
      const redirectUrl = getCurrentUrl()
      dispatch(requestVoteScorePost(postId, option, redirectUrl))
    },
    onVoteScorePostComment: (postId, commentId, option) => {
      const redirectUrl = getCurrentUrl()
      dispatch(requestVoteScorePostComment(postId, commentId, option, redirectUrl))
    },
    onChangeOrderPostsList: (order) => {
      const redirectUrl = getCurrentUrl()
      dispatch(requestChangeOrderPosts(order, redirectUrl))
    },
    onChangeOrderCommentsList: (order) => {
      const redirectUrl = getCurrentUrl()
      dispatch(requestChangeOrderComments(order, redirectUrl))
    },
    onSearch: (value) => {
      const redirectUrl = getCurrentUrl()
      dispatch(requestSearchPosts(value, redirectUrl))
    },
    cleanRedirectUrl: () => dispatch(cleanRedirectUrl()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))