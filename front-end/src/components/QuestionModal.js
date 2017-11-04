import React from 'react'
import PropTypes from 'prop-types'

function QuestionModal(props) {
  const { message, onYesAnswer, onNoAnswer, timeout } = props
  doNoAnswerEventWhenTimeout(timeout, onNoAnswer)
  return (
    <div className="modal-short" onClick={onNoAnswer}>
      <div className="modal-short-dialog">
        <h1>
          {message} <a className="yes" href="/">Yes?</a>  or  <a className="no" href="/">No?</a>
        </h1>
      </div>
    </div>
  )
}

function doNoAnswerEventWhenTimeout(timeout, onNoAnswer) {
  setTimeout(() => {
    onNoAnswer();
  }, timeout);
}

QuestionModal.propTypes = {
  message: PropTypes.string.isRequired,
  onYesAnswer: PropTypes.func.isRequired,
  onNoAnswer: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired
}

export default QuestionModal