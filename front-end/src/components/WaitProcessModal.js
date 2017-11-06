import React from 'react'
import PropTypes from 'prop-types'

function WaitProcessModal(props) {
  const { message } = props
  return (
    <div className="modal-short modal-open">
      <div className="modal-short-dialog wait-preocess-open-dialog">
        <h1>{message}</h1>
      </div>
    </div>
  )
}

WaitProcessModal.propTypes = {
  message: PropTypes.string.isRequired,
}

export default WaitProcessModal