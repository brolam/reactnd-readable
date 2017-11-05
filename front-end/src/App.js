import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home'

class App extends Component {
  GO_HOME = '/';
  
  constructor(props) {
    super(props);
    this.state = {
      categories: ['udacity', 'react', 'redux'],
      posts: [postUdacity, postReact, postRedux],
    };
  }

  render() {
    const { posts, categories } = this.state
    return (
      <Switch>
        <Route exact path={this.GO_HOME} render={({ history }) => (
          <Home
            posts={posts}
            categories={categories}
          />)
        } >
        </Route>
      </Switch >
    )
  }

  componentDidMount() {
  }

  componentDidUpdate() { }
}

const postUdacity = {
  category: "udacity",
  id: "7ni6ok3ym7mf1p33lnez",
  title: "Udacity is the best place to learn technology.",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}

const postReact = {
  category: "react",
  id: "8xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn React",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}

const postRedux = {
  category: "redux",
  id: "7xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn Redux",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}

export default App;