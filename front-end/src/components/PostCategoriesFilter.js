import React from 'react'
import PropTypes from 'prop-types'

function PostCategoriesFilter(props) {
  const { categories } = props
  return (
    <select onChange={props.onSelected} >
      <option value="none">All Categories</option>
      {categories.map(category => (
        <option key={category} value="{category}">{category[0].toUpperCase() + category.slice(1)}</option>
      ))}
    </select>
  )
}

PostCategoriesFilter.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PostCategoriesFilter