import React from 'react'
import ReactDOM from 'react-dom'
import QuestionModal from '../components/QuestionModal'

test('render without error', () => {
  ReactDOM.render(
    <QuestionModal/>, document.createElement('div'));
})