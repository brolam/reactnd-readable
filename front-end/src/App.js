import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Post from './components/Post'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'post',
      categories: ['udacity', 'react', 'redux'],
      posts: [postUdacity, postReact, postRedux],
      comments: comments,
      selectedPost: postReact,
      isEditComment: null,
      showDeletePostQuestionModal: false,
      showDeleteCommentQuestionModal: null,
    };
  }

  render() {
    const { url, selectedPost, posts, categories, comments } = this.state
    if (url === "home") {
      return (
        <Home
          posts={posts}
          categories={categories}
        />)
    } else if (url === "post") {
      return (
        <Post
          post={selectedPost}
          comments={comments.filter(comment => (comment.parentId === selectedPost.id))}
        />
      )
    }
  }
  componentDidMount() { }

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

const comments = [
  {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
]



export default App;