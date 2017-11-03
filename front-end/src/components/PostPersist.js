import React from 'react'

function PostPersist(props) {
  const { post, categories } = props
  return (
    <div id="postPersistModal" className="modal modal-open" >
      <div className="modal-dialog">
        <div className="modal-heard modal-post">
          <span onClick={props.onClickBack} />
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
            {post.category ?
              getFooterIfEditPost(post, props.onClickBack)
              :
              getFooterIfNewPost(categories, props.onClickBack)}
          </div>
        </div>
      </div>
    </div>
  )
}

function getFooterIfNewPost(categories, onSave) {
  return (
    <select onChange={onSave} >
      <option value="none">Save as?</option>
      {categories.map(category => (
        <option className={category} key={category} value="{category}">{category[0].toUpperCase() + category.slice(1)}</option>
      ))}
    </select>
  )
}

function getFooterIfEditPost(post, onSave) {
  return (
    <button className={"save-button " + post.category} href="/"
      onClick={onSave}>Save
    </button>
  )
}

export default PostPersist