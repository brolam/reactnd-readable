import React from 'react'
import ReactDOM from 'react-dom'

import SearchBar from '../components/SearchBar'

test('render without error', () => {
  ReactDOM.render(<SearchBar placeholder="Search by title post" />, document.createElement('div'));
})
