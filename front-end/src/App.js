import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import pathToRegexp from 'path-to-regexp'
import './App.css';
import Home from './components/Home'
import Post from './components/Post'
import { requestPosts, requestSavePost, cleanRedirectUrl, requestPost } from './store/actions'

const GO_HOME = '/';
const GO_POST_NEW = '/post/new';
const GO_POST_GET = '/post/:id';
const gettUrlPost = pathToRegexp.compile(GO_POST_GET)

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

  render() {
    return (
      <Switch>
        <Route exact path={GO_HOME} render={({ history }) => (
          <Home {...this.props} />
        )} />
        <Route exact path={GO_POST_NEW} render={({ history }) => (
          <Home isNewPost={true}  {...this.props} />
        )} />
        <Route exact path={GO_POST_GET} render={({ history }) => (
          <Post {...this.props.selectedPost}  {...this.props} />
        )} />
      </Switch >
    )
  }

  isUserWroteUrlToGePost(currentUrl) {
    if (currentUrl.endsWith('/new')) return false
    return pathToRegexp(GO_POST_GET).test(currentUrl)
  }

  refreshPostPage(currentUrl) {
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
    //pushs
    onClickNewPost: (e) => ownProps.history.push(GO_POST_NEW),
    goHome: (e) => ownProps.history.push(GO_HOME),
    //Pushs and dispatchs
    onSelectedPost: (post) => {
      ownProps.history.push(gettUrlPost({ id: post.id }))
      dispatch(requestPost(post.id))
    },
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))