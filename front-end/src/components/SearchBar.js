import React from 'react'
import { DebounceInput } from 'react-debounce-input';

function SearchBar({
  placeholder,
  searchValue = undefined,
  onSearch = value => { } }) {
  return (
    <div className="search-bar">
      <DebounceInput
        placeholder={placeholder}
        value={searchValue}
        minLength={2}
        debounceTimeout={300}
        onChange={event => onSearch(event.target.value)}
      />
    </div>
  )
}

export default SearchBar