import React from 'react'
import PropTypes from 'prop-types'

function ErrorMesageModal(props) {
  const { message } = props
  return (
    <div className="modal-short modal-open">
      <div className="modal-short-dialog error-message-dialog">
        <h1>{message}</h1>
      </div>
    </div>
  )
}

ErrorMesageModal.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMesageModal