import React from 'react'
import PropTypes from 'prop-types'
import PostCategoriesFilter from '../components/PostCategoriesFilter'
import SearchBar from '../components/SearchBar'
import PostList from '../components/PostList'
import PostModal from '../components/PostModal'
import WaitProcessModal from '../components/WaitProcessModal'

function HomePage({
  posts,
  categories,
  isNewPost = false,
  isShowWaitProcessModal = false,
  goPostNew = e => { },
  goHome = e => { },
  goHomeFilterByCategory = (categoryPath) => { },
  onSavePost = fieldsWasValidated => { },
  onSelectedPost = (post) => { },
  onVoteScorePost = (postId, option) => { },
  onChangeOrderPostsList = (order) => { } }) {
  return (
    <div className="app">
      <div className="main-page-header">
        <div className="main-page-header-title">
          <span />
          <h1>Readable</h1>
          <PostCategoriesFilter
            categories={categories}
            onSelected={e => { goHomeFilterByCategory(e.target.value) }} />
        </div>
      </div>
      <SearchBar placeholder="Search by title post" />
      <div className="main-page-content">
        <PostList
          posts={posts}
          onSelectedPost={onSelectedPost}
          onVoteScorePost={onVoteScorePost}
          onChangeOrderPostsList={onChangeOrderPostsList} />
      </div>
      {
        isNewPost && (
          <PostModal
            post={{}}
            categories={categories}
            onClickBackButton={goHome}
            onSavePost={onSavePost}
          />
        )
      }
      {
        isShowWaitProcessModal && (
          <WaitProcessModal
            message="Please wait while the information is updated."
          />
        )
      }
      <div className="flat-button" onClick={goPostNew}>
        <a className="add">Add Post</a>
      </div>
    </div>
  )
}

HomePage.propTypes = {
  posts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

export default HomePage