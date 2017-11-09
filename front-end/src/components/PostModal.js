import React from 'react'
import PropTypes from 'prop-types'
import { parseReportValidityMethod } from './utils/FormReportValidity'

let titleInput

function PostModal(props) {
  const { post, categories } = props
  function parseFields(e) {
    parseReportValidityMethod(titleInput)
    if (titleInput.reportValidity()) {
      props.onSave(true)
    }
  }
  return (
    <div id="postModal" className="modal modal-open" >
      <div className="modal-dialog">
        <div className="modal-heard modal-post">
          <span onClick={props.onClickBackButton} />
          <input
            ref={(input) => { titleInput = input; }}
            type="text"
            placeholder="Title post"
            defaultValue={post.title}
            autoFocus
            required
            minLength="10"
            maxLength="80"
          />
        </div>
        <div className="modal-content modal-post">
          <textarea
            placeholder="Body post"
            defaultValue={post.body} />
          <div className="modal-footer">
            {isNewPost(post) ?
              getFooterToNewPost(categories, parseFields)
              :
              getFooterToEditPost(post, parseFields)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function isNewPost(post) {
  return post.category ? false : true;
}

function getFooterToNewPost(categories, parseFields) {
  return (
    <select onChange={parseFields} >
      <option value="none">Save as?</option>
      {categories.map(category => (
        <option key={category.path} value={category.path} >{category.name[0].toUpperCase() + category.name.slice(1)}</option>
      ))}
    </select>
  )
}

function getFooterToEditPost(post, parseFields) {
  return (
    <button className={"save-button " + post.category} href="/"
      onClick={parseFields}>Save
    </button>
  )
}

PostModal.propTypes = {
  categories: PropTypes.array.isRequired,
  onClickBackButton: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default PostModal