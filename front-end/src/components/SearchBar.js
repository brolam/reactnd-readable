import React from 'react'
import { DebounceInput } from 'react-debounce-input';

function SearchBar({
  placeholder,
  onSearch = value => { console.log(value) } }) {
  return (
    <div className="search-bar">
      <DebounceInput
        placeholder={placeholder}
        minLength={2}
        debounceTimeout={300}
        onChange={event => onSearch(event.target.value)}
      />
    </div>
  )
}

export default SearchBar