import React from 'react'
import PropTypes from 'prop-types'

function Post({ post }) {
	return (
		<div className="col-6 col-lg-4">
			<div className="card text-white bg-primary mb-3" >
				<div className="card-header">post.category</div>
				<div className="card-body">
					<h4 className="card-title">post.title</h4>
					<p className="card-text">post.body</p>
					<div className="card-text"><small className="card-text">post.timestamp</small></div>
				</div>
			</div>
		</div>
	)

}

Post.propTypes = {
	post: PropTypes.shape({
		category: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		timestamp: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
		voteScore: PropTypes.number.isRequired
	})
}

export default Post