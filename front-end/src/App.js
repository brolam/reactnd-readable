import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';
import VoteScore from './components/VoteScore'
import PostItem from './components/PostItem'
import PostCommentItem from './components/PostCommentItem'
import PostCategoriesFilter from './components/PostCategoriesFilter'
import SearchBar from './components/SearchBar'
import OrderOptions from './components/OrderOptions'
import PostModal from './components/PostModal'
import PostCommentModal from './components/PostCommentModal'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'home',
      categories: ['udacity', 'react', 'redux'],
      posts: [postUdacity, postReact, postRedux],
      comments: comments,
      selectedPost: postUdacity,
      isEditComment: null
    };
  }

  render() {
    const { url, selectedPost, comments } = this.state
    if (url === "home") {
      return this.getHome();
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
                //document.getElementById('editPostModal').style.display = "block";
                this.setState({ isEditPost: true })
              }}>Edit</button>
            <button className="delete-button" href="/"
              onClick={e => {
                const delPostQuestionModal = document.getElementById('delPostQuestionModal');
                delPostQuestionModal.style.display = "block";
                setTimeout(function () {
                  delPostQuestionModal.style.display = "none";
                }, 7000);
              }} >Delete</button>
            <VoteScore voteScore={post.voteScore} />
          </div>
        </div>
        <div className="post-content">
          <div className={"post-page-body"}>
            <div className="post-page-author" >by {post.author} {Moment(post.timestamp).from(new Date())}</div>
            {post.body}
          </div>
          <div className="post-comments-title">
            <span>Commentes({comments.length})</span>
            <OrderOptions />
          </div>
          <div className={"post-page-comments"}>
            {comments.map(comment => (
              <PostCommentItem
                key={comment.id}
                comment={comment}
                onClickEditButton={e => { this.setState({ isEditComment: comment }) }}
                onClickDeleteButton={e => {
                  const delCommentQuestionModal = document.getElementById('delCommentQuestionModal');
                  delCommentQuestionModal.style.display = "block";
                  setTimeout(function () {
                    delCommentQuestionModal.style.display = "none";
                  }, 7000);
                }}
              />
            ))}
          </div>
        </div>
        <div className="flat-button" onClick={e => { this.setState({ isNewComment: true }) }} >
          <a className={"add " + post.category} >Add Comment</a>
        </div>
        {(this.state.isNewComment || this.state.isEditComment) && (
          <PostCommentModal
            post={post}
            comment={this.state.isEditComment ? this.state.isEditComment : {}}
            onClickBackButton={e => this.setState({ isNewComment: false, isEditComment: null })}
            onSave={e => this.setState({ isNewComment: false, isEditComment: null })}

          />
        )}
        <div id="delPostQuestionModal" className="modal-short"
          onClick={e => {
            e.target.style.display = "none";
          }}>
          <div className="modal-short-dialog">
            <h1>Are you sure? Do you want delete this post?  <a className="yes" href="/">Yes?</a>  or  <a className="no" href="/">No?</a> </h1>
          </div>
        </div>
        <div id="delCommentQuestionModal" className="modal-short"
          onClick={e => {
            e.target.style.display = "none";
          }}>
          <div className="modal-short-dialog">
            <h1>Are you sure? Do you want delete this comment?  <a className="yes" href="/">Yes?</a>  or  <a className="no" href="/">No?</a> </h1>
          </div>
        </div>
        {this.state.isEditPost && (
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

  getHome() {
    return (
      <div className="app">
        <div className="main-page-header">
          <div className="main-page-header-title">
            <span />
            <h1>Readable</h1>
            <PostCategoriesFilter categories={this.state.categories} onSelected={e => { }} />
          </div>
        </div>
        <SearchBar placeholder="Search by title post" />
        <div className="main-page-content">
          <div className="posts">
            <div className="posts-title">
              <span>Posts</span>
              <OrderOptions />
            </div>
            <div className="posts-list">
              {this.state.posts.map(post => {
                return (
                  <PostItem
                    key={post.id}
                    post={post}
                    onSelected={e => { this.setState({ url: "post", selectedPost: post }); }}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="flat-button"
          onClick={e => {
            this.setState({ isNewPost: true })
          }}>
          <a className="add">Add Post</a>
        </div>
        {
          this.state.isNewPost && (
            <PostModal
              post={{}}
              categories={this.state.categories}
              onClickBackButton={e => { this.setState({ isNewPost: false }) }}
              onSave={e => { this.setState({ isNewPost: false }) }}
            />
          )
        }
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