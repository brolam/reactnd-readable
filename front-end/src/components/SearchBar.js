import React from 'react'

function SearchBar(props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default SearchBar