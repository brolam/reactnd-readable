import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';

function PostCard({ post, onClick }) {
  return (
    <div className="col-6 col-lg-4" onClick={onClick} >
      <div className={`card text-white bg-${getColorClass(post.category)} mb-3`} >
        <div className="card-header">{post.category}</div>
        <div className="card-body">
          <h4 className="card-title">{post.title}</h4>
          <p className="card-text">{post.body}</p>
          <div className="card-text"><small className="card-text">{post.author}, {Moment(post.timestamp).from(new Date())}.</small></div>
        </div>
      </div>
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  }),
  onClick: PropTypes.func.isRequired
}

export const getColorClass = (category) => {
  const categores = ['udacity', 'react', 'redux'];
  const colors = ['primary', 'info', 'danger'];
  const indexColor = categores.indexOf(category);
  return indexColor === -1 ? 'dark' : colors[indexColor];
}

export default PostCard