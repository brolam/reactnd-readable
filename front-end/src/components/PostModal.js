import React from 'react'
import PropTypes from 'prop-types'
import { parseReportValidityMethod } from './utils/FormReportValidity'
import { capitalize } from '../components/utils/Helpers'

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
      if (isNewPost(props.post)) selecCategory.value = 'none'
    }
  }
  //Fixed out of date title and body setting on defaultValue props.
  if (inputTitle && post.title) inputTitle.value = post.title
  if (inputBody && post.body) inputBody.value = post.body
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
        <option key={category.path} value={category.path} >{capitalize(category.name)}</option>
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