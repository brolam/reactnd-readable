import React, { Component } from 'react';
import './App.css';
import VoteScore from './components/VoteScore'
import PostModal from './components/PostModal'
import PostCommentModal from './components/PostCommentModal'
import QuestionModal from './components/QuestionModal'
import Home from './components/Home'
import PostCommentList from './components/PostCommentList'
import PostCommentBody from './components/PostCommentBody'

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
      return (<Home posts={posts} categories={categories} />)
    } else if (url === "post") {
      return this.getPost(selectedPost, comments.filter(comment => (comment.parentId === selectedPost.id)))
    }
  }
  componentDidMount() { }

  componentDidUpdate() { }

  getPost(post, comments) {
    return (
      <div className="app">
        <div className="post-page-header">
          <a className="post-page-header-back"
            onClick={e => {
              this.setState({ url: "home" })
            }}>Back
          </a>
          <div className="post-page-header-title">
            <span className={post.category} >{post.category}</span>
            <span>{post.title}</span>
          </div>
          <div className="post-page-header-buttons">
            <button className="edit-button" href="/"
              onClick={e => {
                this.setState({ isEditPost: true })
              }}>Edit</button>
            <button className="delete-button"
              onClick={e => {
                this.setState({ showDeletePostQuestionModal: true })
              }}>Delete</button>
            <VoteScore voteScore={post.voteScore} />
          </div>
        </div>
        <div className="post-content">
          <PostCommentBody post={post} />
          <PostCommentList post={post} comments={comments} />
        </div>
        {
          (this.state.isNewComment || this.state.isEditComment) && (
            <PostCommentModal
              post={post}
              comment={this.state.isEditComment ? this.state.isEditComment : {}}
              onClickBackButton={e => this.setState({ isNewComment: false, isEditComment: null })}
              onSave={e => this.setState({ isNewComment: false, isEditComment: null })}

            />
          )}
        {
          this.state.showDeletePostQuestionModal && (
            <QuestionModal
              message={"Are you sure? Do you want delete this post? "}
              timeout={7000}
              onYesAnswer={e => this.setState({ showDeletePostQuestionModal: false })}
              onNoAnswer={e => this.setState({ showDeletePostQuestionModal: false })}
            />
          )}
        {
          this.state.showDeleteCommentQuestionModal && (
            <QuestionModal
              message={"Are you sure? Do you want delete this comment?"}
              timeout={7000}
              onYesAnswer={e => this.setState({ showDeleteCommentQuestionModal: false })}
              onNoAnswer={e => this.setState({ showDeleteCommentQuestionModal: false })}
            />
          )}
        {
          this.state.isEditPost && (
            <PostModal
              post={post}
              categories={this.state.categories}
              onClickBackButton={e => { this.setState({ isEditPost: false }) }}
              onSave={e => { this.setState({ isEditPost: false }) }}
            />
          )}
      </div>
    )
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