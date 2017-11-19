import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../components/utils/Helpers'

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
          value={category.path} >{capitalize(category.name)}</option>
      ))}
    </select>
  )
}

PostCategoriesFilter.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PostCategoriesFilter