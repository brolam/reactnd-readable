import React from 'react'
import PropTypes from 'prop-types'

function VoteScore(props) {
  return ([
    <button
      key="buttonLiked"
      className="liked"
      onClick={props.onClickLiked} >
      Liked <span>{props.voteScore}</span>
    </button>,
    <button
      key="buttonNotLiked"
      className="not-liked"
      onClick={props.onClickNotLiked} >
      Not like
    </button>
  ])
}

VoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
}

export default VoteScore