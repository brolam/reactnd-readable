import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './bootstrapSetup.js';
import PostCard from './components/PostCard'
import PostForm from './components/PostForm'
import { postFormConfigEvents, PostFormButtonShow } from './components/PostForm'
import { getColorClass } from './components/PostCard'
//import ReadableAPI from './ReadableAPI'

const $ = window.jQuery;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { url: 'home', posts: [] };
  }

  render() {
    if (this.state.url === 'home')
      return this.homeView();
    if (this.state.url === 'post/udacity')
      return this.postView('udacity')
    if (this.state.url === 'post/react')
      return this.postView('react')
    if (this.state.url === 'post/redux')
      return this.postView('redux')
  }

  componentDidMount() {
    /*
    ReadableAPI.getPosts().then( posts =>{
      console.log(posts);
    });
    */
    postFormConfigEvents();
  }

  componentDidUpdate() {
    $('#deleteModal').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget) // Button that triggered the modal
      const whatever = button.data('whatever'); // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
      modal.find('.modal-title').text(whatever.title)
      modal.find('.modal-body').text(whatever.message)
    })



    $('#commentModal').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget) // Button that triggered the modal
      const whatever = button.data('whatever'); // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
      modal.find('.modal-title').text(whatever.title)
      modal.find('#comment-body').val(whatever.commentBody)
    })
  }

  homeView() {
    return (
      <div className="app" >
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Readable</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Udacity</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">React</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Redux</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Order
              </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="/">Published</a>
                  <a className="dropdown-item" href="/">Likes</a>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="row">
                <PostCard post={postUdacity} onClick={() => { this.setState({ url: "post/udacity" }) }} />
                <PostCard post={postReact} onClick={() => { this.setState({ url: "post/react" }) }} />
                <PostCard post={postRedux} onClick={() => { this.setState({ url: "post/redux" }) }} />
              </div>
            </div>
          </div>
        </div>
        <PostForm categories={['udacity', 'react', 'redux']} />
        <div className="add-button">
          <PostFormButtonShow className="post" title="Add New Post" post='{"title": "New Post 123", "postTitle":"", "postBody": ""}' />
        </div>
      </div>
    )
  }

  postView(category) {
    const categoryColorClass = getColorClass(category);
    return (
      <div className="app" >
        <nav className={"navbar navbar-expand-md fixed-top navbar-dark " + category}>
          <a className="navbar-brand back-button" href="/"> </a>
          <a className="navbar-brand" href="/">Primary card title</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <PostFormButtonShow
                  className="nav-link"
                  title="Edit"
                  post={`{"title": "Edit Post", "category":"${category}", "postTitle":"Primary card title", "postBody": "Some quick example text to build on the card title and make up the bulk of the cards content."}`}
                />
              </li>
              <li className="nav-item active">
                <a className="nav-link" data-toggle="modal" data-target="#deleteModal" data-whatever='{"title": "Delete Post", "message": "Some quick example text to build on the card title and make up the bulk of the cards content."}'>Delete</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={"btn btn-" + categoryColorClass + " active"}>Your vote</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>1</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>2</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>3</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>4</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>5</button>
              </div>
            </form>
          </div>
        </nav>
        <div className="container">
          <div className="card-body">
            <h3 className={"text-" + categoryColorClass}>Last updated 3 mins ago, Breno Marques</h3>
            <p className={"text-" + categoryColorClass} >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div className={"card border-" + categoryColorClass + " mb-3"}>
            <div className={"card-body categoryColorClass" + categoryColorClass} >
              <p className={"card-text text-" + categoryColorClass} >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
            <div className="card-footer">
              <button type="button" className={"btn btn-link text-" + categoryColorClass} data-toggle="modal" data-target="#commentModal" data-whatever='{"title": "Edit Comment", "commentBody": "Some quick example text to build on the card title and make up the bulk of the cards content."}' >Edit</button>
              <button type="button" className={"btn btn-link text-" + categoryColorClass} data-toggle="modal" data-target="#deleteModal" data-whatever='{"title": "Delete Comment", "message": "Some quick example text to build on the card title and make up the bulk of the cards content."}' >Delete</button>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={"btn btn-" + categoryColorClass + " active"}>Your vote</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>1</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>2</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>3</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>4</button>
                <button type="button" className={"btn btn-" + categoryColorClass}>5</button>
              </div>
            </div>
          </div>
        </div>
        <PostForm categories={['udacity', 'react', 'redux']} />
        <div className="modal fade" id="commentModal" tabIndex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="commentModalLabel">New Comment</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="post-body" className="form-control-label">Content:</label>
                    <textarea className="form-control" id="comment-body"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className={"btn btn-" + categoryColorClass} >Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="add-button">
          <a className={category} data-toggle="modal" data-target="#commentModal" data-whatever='{"title": "New Comment", "commentBody": ""}' >Add Comment</a>
        </div>
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="titleModalDelete" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="titleModalDelete">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" id="bodyModalDelete" >
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-warning" data-dismiss="modal">Delete</button>
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


export default App;