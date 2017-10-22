import React from 'react'
import $ from 'jquery';
import { getColorClass } from './PostCard'

function PostForm({categories}) {
  return (
    <div className="modal fade" id="postForm" tabIndex="-1" role="dialog" aria-labelledby="postFormLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="postFormLabel">New Post</h5>
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
          {categories.map(category =>(
            <button key={category} type="button" className={"btn btn-" + getColorClass(category)} value={category}>{category}</button>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PostFormButtonShow({ className, title, post }) {
  return (
    <a className={className} data-toggle="modal" data-target="#postForm" data-whatever={post} >{title}</a>
  )
}

export const postFormConfigEvents = () => {
  $('#postForm').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget) // Button that triggered the modal
    const whatever = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(whatever.title)
    modal.find('#post-title').val(whatever.postTitle)
    modal.find('#post-body').val(whatever.postBody)
    if (whatever.category) {
      modal.find('.modal-footer button').hide()
      modal.find(`.modal-footer [value="${whatever.category}"]`).show()
    }
  })
}

export default PostForm