import React from 'react'
import OrderOptions from '../components/OrderOptions'
import PostItem from '../components/PostItem'

function PostList(props) {
  return (
    <div className="posts">
      <div className="posts-title">
        <span>Posts</span>
        <OrderOptions />
      </div>
      <div className="posts-list">
        {props.posts.map(post => {
          return (
            <PostItem
              key={post.id}
              post={post}
              onSelected={e => { }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PostList
