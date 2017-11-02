import React, { Component } from 'react';
import './App.css';
import Moment from 'moment';
import VoteScore from './components/VoteScore'
import Post from './components/Post'
import PostComment from './components/PostComment'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'home',
      categories: ['udacity', 'react', 'redux'],
      posts: [postUdacity, postReact, postRedux],
      comments: comments,
      selectedPost: postUdacity
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
                document.getElementById('editPostModal').style.display = "block";
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
            <div className="order-options">
              <select>
                <option value="voteScore" > Vote Score</option>
                <option value="publishedDate" >Published date</option>
              </select>
            </div>
          </div>
          <div className={"post-page-comments"}>
            {comments.map(comment => (
              <PostComment
                comment={comment}
                onClickEditButton={e => {
                  document.getElementById('commentModal').style.display = "block";
                  document.getElementById('commentModalTitle').innerText = `Edit comment by ${comment.author} ${Moment(comment.timestamp).from(new Date())}`;
                  const body = document.getElementById('commentModalBody');
                  body.value = comment.body;
                  body.focus();
                }}
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
        <div className="flat-button" onClick={e => {
          document.getElementById('commentModal').style.display = "block";
        }} >
          <a className={"add " + post.category} >Add Comment</a>
        </div>
        <div id="editPostModal" className="modal">
          <div className="modal-dialog">
            <div className="modal-heard modal-post">
              <span onClick={e => {
                document.getElementById('editPostModal').style.display = "none";
              }} />
              <input
                type="text"
                placeholder="Title new post"
                defaultValue={post.title}
              />
            </div>
            <div className="modal-content modal-post">
              <textarea placeholder="Body post" defaultValue={post.body} />
              <div className="modal-footer">
                <button className={"save-button " + post.category} href="/"
                  onClick={e => {
                    document.getElementById('editPostModal').style.display = "none";
                    console.log("Open");
                  }}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div id="commentModal" className="modal">
          <div className="modal-dialog">
            <div className="modal-heard">
              <span onClick={e => {
                document.getElementById('commentModal').style.display = "none";
              }} />
              <h1 id="commentModalTitle" >New comment</h1>
            </div>
            <div className="modal-content modal-comment">
              <textarea id="commentModalBody" placeholder="Body comment" />
              <div className="modal-footer">
                <button className={"save-button " + post.category} href="/"
                  onClick={e => {
                    document.getElementById('commentModal').style.display = "none";
                  }}>Save</button>
              </div>
            </div>
          </div>
        </div>
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
            <div className="posts-title">
              <span>Posts</span>
              <div className="order-options">
                <select>
                  <option value="voteScore" > Vote Score</option>
                  <option value="publishedDate" >Published date</option>
                </select>
              </div>
            </div>
            <div className="posts-list">
              {this.state.posts.map(post => {
                return (
                  <Post key={post.id} post={post} onSelected={e => { this.setState({ url: "post", selectedPost: post }); }} />
                )
              })}
            </div>
          </div>
        </div>
        <div className="flat-button"
          onClick={e => {
            document.getElementById('newPostModal').style.display = "block";
            console.log("Open");
          }}>
          <a className="add">Add Post</a>
        </div>
        <div id="newPostModal" className="modal">
          <div className="modal-dialog">
            <div className="modal-heard modal-post">
              <span onClick={e => {
                document.getElementById('newPostModal').style.display = "none";
              }} />
              <input
                type="text"
                placeholder="Title new post"
              />
            </div>
            <div className="modal-content modal-post">
              <textarea placeholder="Body post" />
              <div className="modal-footer">
                <select onChange={e => {
                  document.getElementById('newPostModal').style.display = "none";
                }} >
                  <option value="none">Save as?</option>
                  {this.state.categories.map(category => (
                    <option className={category} key={category} value="{category}">{category[0].toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
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