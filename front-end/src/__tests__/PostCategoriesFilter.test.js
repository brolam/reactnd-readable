
import React from 'react'
import ReactDOM from 'react-dom'
import PostCategoriesFilter from '../components/PostCategoriesFilter'

test('render without error', () => {
  ReactDOM.render(<PostCategoriesFilter categories={categories} />, document.createElement('div'));
})

const  categories = ['udacity', 'react', 'redux']