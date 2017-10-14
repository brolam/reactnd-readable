import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
const $ = require('jquery');
window.jQuery = $;
window.Popper = require('popper.js').default;
require('bootstrap');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { url: 'home' };
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


    $('#postModal').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget) // Button that triggered the modal
      const whatever = button.data('whatever'); // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
      modal.find('.modal-title').text(whatever.title)
      modal.find('#post-title').val(whatever.postTitle)
      modal.find('#post-body').val(whatever.postBody)
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
                <div className="col-6 col-lg-4">
                  <div className="card text-white bg-primary mb-3" onClick={() => { this.setState({ url: "post/udacity" }) }} >
                    <div className="card-header">udacity</div>
                    <div className="card-body">
                      <h4 className="card-title">Primary card title</h4>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <div className="card-text"><small className="card-text">Last updated 3 mins ago, Breno Marques</small></div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4">
                  <div className="card text-white bg-danger mb-3" onClick={() => { this.setState({ url: "post/react" }) }} >
                    <div className="card-header">redux</div>
                    <div className="card-body">
                      <h4 className="card-title">Danger card title</h4>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <div className="card-text"><small className="card-text">Last updated 3 mins ago, Breno Marques</small></div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-4">
                  <div className="card text-white bg-info mb-3" onClick={() => { this.setState({ url: "post/redux" }) }} >
                    <div className="card-header">react</div>
                    <div className="card-body">
                      <h4 className="card-title">Info card title</h4>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <div className="card-text"><small className="card-text">Last updated 3 mins ago, Breno Marques</small></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="postModal" tabIndex="-1" role="dialog" aria-labelledby="postModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="postModalLabel">New Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="post-titel" className="form-control-label">Title:</label>
                    <input type="text" className="form-control" id="post-title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="post-body" className="form-control-label">Content:</label>
                    <textarea className="form-control" id="post-body"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">Save as Udacity</button>
                <button type="button" className="btn bg-danger">React</button>
                <button type="button" className="btn bg-info">Redux</button>
              </div>
            </div>
          </div>
        </div>
        <div className="add-button">
          <a className="post" data-toggle="modal" data-target="#postModal" data-whatever='{"title": "New Post", "postTitle":"", "postBody": ""}' >Add Post</a>
        </div>
      </div>
    )
  }

  postView(category) {
    let categoryColorClass = "primary";
    if (category === 'react') categoryColorClass = "danger";
    if (category === 'redux') categoryColorClass = "info";
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
                <div className="nav-link" data-toggle="modal" data-target="#postModal" data-whatever='{"title": "Edit Post", "postTitle":"Primary card title", "postBody": "Some quick example text to build on the card title and make up the bulk of the cards content."}' >Edit</div>
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
        <div className="modal fade" id="postModal" tabIndex="-1" role="dialog" aria-labelledby="postModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="postModalLabel">New Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="post-titel" className="form-control-label">Title:</label>
                    <input type="text" className="form-control" id="post-title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="post-body" className="form-control-label">Content:</label>
                    <textarea className="form-control" id="post-body"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary">Save</button>
              </div>
            </div>
          </div>
        </div>
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

export default App;