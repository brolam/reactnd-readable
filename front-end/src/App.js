import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';

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
        <div className="main-page-content">
          <div className="posts">
            <h2 className="posts-title">Posts</h2>
            <div className="posts-list ">
              {this.state.posts.map(post => {
                return (
                  <div key={post.id} className="post">
                    <div className="post-header">
                      <div className="post-header-title">
                        <span className={"category " + post.category} >{post.category[0].toUpperCase() + post.category.slice(1)}</span> {post.title}
                      </div>
                      <div className="post-header-published">
                        <span className="published">{Moment(post.timestamp).from(new Date())}</span>
                      </div>
                    </div>
                    <div className="post-header-author">by {post.author}</div>
                    <div className="post-body">{post.body}</div>
                    <div className="post-footer">
                      <button className="liked" href="/"  >Liked <span>6</span></button>
                      <button className="not-liked" href="/" >Not like</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
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