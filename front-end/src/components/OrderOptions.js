import React from 'react'

function OrderOptions(props) {
  return (
    <div className="order-options">
      <select>
        <option value="voteScore" >Vote Score</option>
        <option value="publishedDate" >Published date</option>
      </select>
    </div>
  )
}

export default OrderOptions