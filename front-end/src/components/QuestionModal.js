import React from 'react'
import PropTypes from 'prop-types'

let questionModalTimeout

function QuestionModal(props) {
  let isYesOrNoClicked = false
  const { message, onYesAnswer, onNoAnswer, timeout } = props
  doNoAnswerEventWhenTimeout(timeout, onNoAnswer, this)
  return (
    <div className="modal-short modal-open"
      onClick={e => {
        if (isYesOrNoClicked === false)
          clearTimeoutAndDoEvent(e, onNoAnswer)
      }
      }>
      <div className="modal-short-dialog">
        <h1>
          {message}
          <a
            className="yes"
            onClick={e => {
              isYesOrNoClicked = true
              clearTimeoutAndDoEvent(e, onYesAnswer)
            }
            }>Yes? </a>
          or <a
            className="no"
            onClick={e => {
              isYesOrNoClicked = true
              clearTimeoutAndDoEvent(e, onNoAnswer)
            }}>No?</a>
        </h1>
      </div>
    </div>
  )
}

function clearTimeoutAndDoEvent(e, eventTag) {
  window.clearTimeout(questionModalTimeout);
  eventTag(e)
}

const doNoAnswerEventWhenTimeout = (timeout, onNoAnswer) => {
  window.clearTimeout(questionModalTimeout);
  questionModalTimeout = window.setTimeout(() => {
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