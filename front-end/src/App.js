import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import pathToRegexp from 'path-to-regexp'
import './App.css';
import HomePage from './components/HomePage'
import PostPage from './components/PostPage'
import { clearQuestionModalTimeout } from './components/QuestionModal'
import * as routes from './routes'
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const currentUrl = this.props.location.pathname
    //Do a dispatch to update the screen
    this.doDispatchByUrl(currentUrl)
    //Do a dispatch to update the screen 
    //when the user clicks back or forward in the browser
    this.props.history.listen((location, action) => {
      if (action === 'POP') {
        const currentUrl = location.pathname
        this.doDispatchByUrl(currentUrl)
      }
    })
  }

  componentDidUpdate() {
    //Do an URL redirect when it's necessary
    //for example: When saved a post and he is redirect to homepage. 
    //See the requestRedirect and cleanRedirectUrl in Redux actions. 
    if (this.isThereOneRedirectRequest()) {
      this.doRequestRedirect()
    }
  }

  componentWillUpdate() {
    clearQuestionModalTimeout()
  }

  render() {
    return (
      <Switch>
        {[routes.GO_HOME_FILTER, routes.GO_POST_NEW, routes.GO_HOME].map(path => (
          <Route key={path} exact path={path} render={({ history }) => (
            <HomePage {...this.props} {...routes.getHomePropsByUrl(history.location.pathname) } />
          )} />))
        }
        <Route exact path={routes.GO_POST_GET} render={({ history }) => (
          <PostPage
            {...routes.getPostPagePropsByUrl(history.location.pathname, this.props.selectedPost.comments) }
            {...this.props.selectedPost}
            {...this.props} />
        )} />
      </Switch >
    )
  }

  isThereOneRedirectRequest() {
    return (this.props.redirectUrl) ? true : false
  }

  doRequestRedirect() {
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
    if (routes.isHomeFilterByCategoryUrl(url)) {
      const params = pathToRegexp(routes.GO_HOME_FILTER).exec(url)
      this.props.dispatchRequestPostsByCategory(params[1])
      return
    }
    if (routes.isHomeUrl(url)) {
      this.props.dispatchRequestPosts()
      return
    }
    if (routes.isPostPageUrl(url)) {
      const params = pathToRegexp(routes.GO_POST_GET).exec(url)
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
      ownProps.history.push(routes.GO_HOME)
      dispatch(requestRedirect(routes.GO_HOME))
    },
    goHomeFilterByCategory: (categoryPath) => {
      const url = (categoryPath === 'none') ? routes.GO_HOME : routes.getHomeFilterPathToRegexp({ categoryPath })
      dispatch(requestRedirect(url))
    },
    goBack: (e) => ownProps.history.goBack(),
    goPostNew: (e) => ownProps.history.push(routes.GO_POST_NEW),
    goPostEdit: post => {
      ownProps.history.push(
        routes.getPostPathToRegexp({ id: post.id, action: routes.POST_URL_ACTIONS.edit })
      )
    },
    goPostNewComment: (postId) => {
      const urlNewComment = routes.getPostPathToRegexp({
        id: postId,
        action: routes.POST_URL_ACTIONS.comments,
        commentId: routes.COMMENT_URL_ACTIONS.new
      })
      ownProps.history.push(urlNewComment)
    },
    goPostEditComment: (postId, commentId) => {
      const urlEditComment = routes.getPostPathToRegexp({
        id: postId,
        action: routes.POST_URL_ACTIONS.comments,
        commentId: commentId,
        commentAction: routes.COMMENT_URL_ACTIONS.edit
      })
      ownProps.history.push(urlEditComment)
    },
    goPostDeleteComment: (postId, commentId) => {
      const urlDeleteComment = routes.getPostPathToRegexp({
        id: postId,
        action: routes.POST_URL_ACTIONS.comments,
        commentId: commentId,
        commentAction: routes.COMMENT_URL_ACTIONS.delete
      })
      ownProps.history.push(urlDeleteComment)
    },
    goPostDelete: (postId) => {
      ownProps.history.push(routes.getPostPathToRegexp(
        {
          id: postId,
          action: routes.POST_URL_ACTIONS.delete
        }))
    },
    dispatchRequestPosts: (search) => dispatch(requestPosts()),
    dispatchRequestPost: (postId) => dispatch(requestPost(postId)),
    dispatchRequestPostsByCategory: (categoryPath) => (
      dispatch(requestPostsByCategory(categoryPath))
    ),
    onSelectedPost: (post) => {
      ownProps.history.push(routes.getPostPageUrl(post.id))
      dispatch(requestPost(post.id))
    },
    onSavePost: (fieldsWasValidated, post) => {
      fieldsWasValidated && dispatch(requestSavePost(post, routes.GO_HOME))
    },
    onSavePostComment: (postId, comment) => {
      const redirectUrl = routes.getPostPageUrl(postId)
      dispatch(requestSaveComment(postId, comment, redirectUrl))
    },
    onSavePostEdited: (fieldsWasValidated, post) => {
      const redirectUrl = routes.getPostPageUrl(post.id)
      dispatch(requestSavePost(post, redirectUrl))
    },
    onDeletePost: (postId) => dispatch(requestDeletePost(postId, routes.GO_HOME)),
    onDeletePostComment: (postId, commentId) => {
      const redirectUrl = routes.getPostPageUrl(postId)
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