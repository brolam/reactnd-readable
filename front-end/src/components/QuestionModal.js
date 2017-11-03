import React from 'react'
import PropTypes from 'prop-types'

function QuestionModal(props) {
  const { message, onYesAnswer, onNoAnswer } = props
  return (
    <div className="modal-short">
      <div className="modal-short-dialog">
        <h1>
          {message} <a className="yes" href="/">Yes?</a>  or  <a className="no" href="/">No?</a>
        </h1>
      </div>
    </div>
  )
}

QuestionModal.propTypes = {
  message: PropTypes.string.isRequired,
  onYesAnswer: PropTypes.func.isRequired,
  onNoAnswer: PropTypes.func.isRequired
}

export default QuestionModal