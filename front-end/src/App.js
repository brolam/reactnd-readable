import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import Home from './components/Home'
import { requestPosts } from './store/actions'

class App extends Component {
  GO_HOME = '/';
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
        <Route exact path={this.GO_HOME} render={({ history }) => {
          const { posts, categories, isShowWaitProcessModal } = this.props
          return (
            <Home
              posts={posts}
              categories={categories}
              isShowWaitProcessModal = {isShowWaitProcessModal}
            />)
        }}>
        </Route>
      </Switch >
    )
  }
  
  componentDidUpdate() { }
}

function mapStateToProps({ home }) {
  return home 
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestPosts: (search) => dispatch(requestPosts(search)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)