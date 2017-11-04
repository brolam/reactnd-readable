import React from 'react'
import PropTypes from 'prop-types'

let questionModalTimeout

function QuestionModal(props) {
  const { message, onYesAnswer, onNoAnswer, timeout } = props
  doNoAnswerEventWhenTimeout(timeout, onNoAnswer)
  return (
    <div className="modal-short modal-open" onClick={
      e => clearTimeoutAndDoEvent(e, onNoAnswer)
    }>
      <div className="modal-short-dialog">
        <h1>
          {message} <a className="yes" onClick={
            e => clearTimeoutAndDoEvent(e, onYesAnswer)
          }>Yes? </a> or <a className="no" onClick={
            e => clearTimeoutAndDoEvent(e, onNoAnswer)
          } >No?</a>
        </h1>
      </div>
    </div>
  )
}

function clearTimeoutAndDoEvent(e, eventTag) {
  clearTimeout(questionModalTimeout)
  eventTag(e)
}

function doNoAnswerEventWhenTimeout(timeout, onNoAnswer) {
  questionModalTimeout = setTimeout(() => {
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