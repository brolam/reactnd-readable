import React from 'react'

function OrderOptions({
  selectedValue = 'voteScore',
  onChageOrder = order => { } }) {
  return (
    <div className="order-options">
      <select
        onChange={e => onChageOrder(e.target.value)}
        defaultValue={selectedValue}>
        <option value="voteScore" >Vote Score</option>
        <option value="publishedDate" >Published date</option>
      </select>
    </div>
  )
}

export default OrderOptions