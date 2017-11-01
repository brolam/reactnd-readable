import React from 'react'
import PropTypes from 'prop-types'

function VoteScrore(entityType, entityId, voteScore){
    return(
      <div></div>
    )
} 

VoteScrore.propTypes = {
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired
}

export default VoteScrore