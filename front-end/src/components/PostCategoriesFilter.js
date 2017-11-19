import React from 'react'
import PropTypes from 'prop-types'

function PostCategoriesFilter(
  { categories,
    onSelected = e => { },
    selectedCategoryPath = 'none' }) {
  return (
    <select
      value={selectedCategoryPath}
      onChange={onSelected} >
      <option value="none">All Categories</option>
      {categories.map(category => (
        <option
          key={category.name}
          value={category.path} >{category.name[0].toUpperCase() + category.name.slice(1)}</option>
      ))}
    </select>
  )
}

PostCategoriesFilter.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PostCategoriesFilter