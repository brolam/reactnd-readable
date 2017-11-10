import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import Home from './components/Home'
import { requestPosts, requestSavePost, cleanRedirectUrl } from './store/actions'

const GO_HOME = '/';
const GO_POST_NEW = '/post/new';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatchRequestPosts(this.props.search)
  }

  render() {
    return (
      <Switch>
        <Route exact path={GO_HOME} render={({ history }) => (
          <Home {...this.props} />
        )}
        />
        <Route exact path={GO_POST_NEW} render={({ history }) => {
          return (<Home isNewPost={true}  {...this.props} />)
        }}
        />
      </Switch >
    )
  }

  componentWillReceiveProps() {
    if (!this.props.redirectUrl) return
    if (this.props.redirectUrl !== this.props.location.pathname) {
      this.props.cleanRedirectUrl()
      this.props.history.push(this.props.redirectUrl)
    }
  }
}

function mapStateToProps({ home }, ownProps) {
  return home;
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchRequestPosts: (search) => dispatch(requestPosts(search)),
    onClickNewPost: (e) => ownProps.history.push(GO_POST_NEW),
    goHome: (e) => ownProps.history.push(GO_HOME),
    cleanRedirectUrl: () => dispatch(cleanRedirectUrl()),
    onSavePost: (fieldsWasValidated, post) => {
      fieldsWasValidated && dispatch(requestSavePost(post, GO_HOME))
    },
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))