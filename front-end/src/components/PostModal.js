import React from 'react'
import PropTypes from 'prop-types'
import { parseReportValidityMethod } from './utils/FormReportValidity'

let inputTitle
let inputBody
let selecCategory

function PostModal(props) {
  const { post, categories } = props
  function parseFields(e) {
    if ((isNewPost(props.post)) && (selecCategory.value === 'none')) return
    parseReportValidityMethod(inputTitle)
    parseReportValidityMethod(inputBody)
    if (inputTitle.reportValidity() && inputBody.reportValidity()) {
      const postParam = isNewPost(props.post) ?
        buildNewPost(inputTitle.value, inputBody.value, selecCategory.value)
        :
        buildEditPost(props.post, inputTitle.value, inputBody.value)
      props.onSavePost(true, postParam)
    } else {
      if (selecCategory) selecCategory.value = 'none'
    }
  }
  return (
    <div id="postModal" className="modal modal-open" >
      <div className="modal-dialog">
        <div className="modal-heard modal-post">
          <span onClick={props.onClickBackButton} />
          <input
            ref={(input) => { inputTitle = input; }}
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
            ref={(textarea) => { inputBody = textarea; }}
            placeholder="Body post"
            defaultValue={post.body}
            required
            minLength="2"
            maxLength="500"
          />
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

export function isNewPost(post) {
  return post.id ? false : true;
}

export function buildNewPost(title, body, category) {
  return {
    title,
    body,
    category,
    author: 'Breno Marques',
    timestamp: new Date().getTime(),
    voteScore: 1,
    deleted: false
  }
}

function buildEditPost(post, title, body) {
  return { ...post, title, body }
}

function getFooterToNewPost(categories, parseFields) {
  return (
    <select ref={(select) => { selecCategory = select; }} onChange={parseFields} >
      <option value="none">Save as?</option>
      {categories.map(category => (
        <option key={category.path} value={category.path} >{category.name[0].toUpperCase() + category.name.slice(1)}</option>
      ))}
    </select>
  )
}

function getFooterToEditPost(post, parseFields) {
  return (
    <button className={"save-button " + post.category}
      onClick={parseFields}>Save
    </button>
  )
}

PostModal.propTypes = {
  categories: PropTypes.array.isRequired,
  onClickBackButton: PropTypes.func.isRequired,
  onSavePost: PropTypes.func.isRequired
}

export default PostModal