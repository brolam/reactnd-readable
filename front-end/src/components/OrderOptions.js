import React from 'react'

function OrderOptions({ onChageOrder = order => { } }) {
  return (
    <div className="order-options">
      <select onChange={e => onChageOrder(e.target.value)} >
        <option value="voteScore" >Vote Score</option>
        <option value="publishedDate" >Published date</option>
      </select>
    </div>
  )
}

export default OrderOptions