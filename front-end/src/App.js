import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'home',
      categories: ['udacity', 'react', 'redux'],
      posts: [postUdacity, postReact, postRedux]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="main-page-header">
          <div className="main-page-header-title">
            <span />
            <h1>Readable</h1>
            <select >
              <option value="none">All Categories</option>
              {this.state.categories.map(category => (
                <option key={category} value="{category}">{category[0].toUpperCase() + category.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title post"
          />
        </div>
      </div>
    )
  }
  componentDidMount() {
  }

  componentDidUpdate() {

  }
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