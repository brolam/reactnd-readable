import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import Home from './components/Home'
import { requestPosts } from './store/actions'

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
  componentDidUpdate() { }
}

function mapStateToProps({ home }) {
  return home;
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchRequestPosts: (search) => dispatch(requestPosts(search)),
    onClickNewPost: (e) => ownProps.history.push(GO_POST_NEW),
    goHome: (e) => ownProps.history.push(GO_HOME),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))