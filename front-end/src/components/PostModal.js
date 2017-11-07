import React from 'react'
import PropTypes from 'prop-types'

function PostModal(props) {
  const { post, categories } = props
  return (
    <div id="postModal" className="modal modal-open" >
      <div className="modal-dialog">
        <div className="modal-heard modal-post">
          <span onClick={props.onClickBackButton} />
          <input
            type="text"
            placeholder="Title post"
            defaultValue={post.title}
          />
        </div>
        <div className="modal-content modal-post">
          <textarea
            placeholder="Body post"
            defaultValue={post.body} />
          <div className="modal-footer">
            {isNewPost(post) ?
              getFooterToNewPost(categories, props.onSave)
              :
              getFooterToEditPost(post,  props.onSave)
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

function getFooterToNewPost(categories, onSave) {
  return (
    <select onChange={onSave} >
      <option value="none">Save as?</option>
      {categories.map(category => (
        <option key={category.path} value={category.path} >{category.name.toUpperCase() + category.name.slice(1)}</option>
      ))}
    </select>
  )
}

function getFooterToEditPost(post, onSave) {
  return (
    <button className={"save-button " + post.category} href="/"
      onClick={onSave}>Save
    </button>
  )
}

PostModal.propTypes = {
  categories: PropTypes.array.isRequired,
  onClickBackButton: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default PostModal