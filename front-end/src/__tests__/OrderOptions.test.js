import React from 'react'
import ReactDOM from 'react-dom'

import OrderOptions from '../components/OrderOptions'

test('render without error', () => {
  ReactDOM.render(<OrderOptions />, document.createElement('div'));
})
