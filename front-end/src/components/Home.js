import React from 'react'
import PropTypes from 'prop-types'
import PostCategoriesFilter from '../components/PostCategoriesFilter'
import SearchBar from '../components/SearchBar'
import PostList from '../components/PostList'
import PostModal from '../components/PostModal'
import WaitProcessModal from '../components/WaitProcessModal'

function Home({
  posts,
  categories,
  isNewPost = false,
  isShowWaitProcessModal = false ,
  onClickNewPost = e=>{},
  goHome = e=>{} }) {
  return (
    <div className="app">
      <div className="main-page-header">
        <div className="main-page-header-title">
          <span />
          <h1>Readable</h1>
          <PostCategoriesFilter categories={categories} onSelected={e => { }} />
        </div>
      </div>
      <SearchBar placeholder="Search by title post" />
      <div className="main-page-content">
        <PostList posts={posts} />
      </div>
      {
        isNewPost && (
          <PostModal
            post={{}}
            categories={categories}
            onClickBackButton={goHome}
            onSave={e => { }}
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
      <div className="flat-button" onClick={onClickNewPost}>
        <a className="add">Add Post</a>
      </div>
    </div>
  )
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
}

export default Home