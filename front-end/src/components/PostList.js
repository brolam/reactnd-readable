import React from 'react'
import PropTypes from 'prop-types'
import OrderOptions from '../components/OrderOptions'
import PostItem from '../components/PostItem'

function PostList({
  posts,
  onSelectedPost = (posts) => { },
  goPostEdit = post => { },
  onVoteScorePost = (postId, option) => { },
  onChangeOrderPostsList = (order) => { },
  selectedPostsOrder }) {
  return (
    <div className="posts">
      <div className="posts-title">
        <span>Posts</span>
        <OrderOptions 
        onChangeOrder={onChangeOrderPostsList}
        selectedValue={selectedPostsOrder} />
      </div>
      <div className="posts-list">
        {posts.map(post => {
          return (
            <PostItem
              key={post.id}
              post={post}
              onSelected={(e) => onSelectedPost(post)}
              goPostEdit={goPostEdit}
              onVoteScorePost={onVoteScorePost}
            />
          )
        })}
      </div>
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList
