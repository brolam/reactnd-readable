import React from 'react'
import PropTypes from 'prop-types'

function VoteScore(props){
    return([
      <button key="buttonLiked" className="liked" href="/"  >Liked <span>{props.voteScore}</span></button>,
      <button key="buttonNotLiked" className="not-liked" href="/" >Not like</button>
    ])
} 

VoteScore.propTypes = {
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired
}

export default VoteScore