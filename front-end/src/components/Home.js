import React from 'react'
import PostCategoriesFilter from '../components/PostCategoriesFilter'
import SearchBar from '../components/SearchBar'
import PostList from '../components/PostList'
import PostModal from '../components/PostModal'

function Home({ posts, categories, isNewPost }) {
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
            onClickBackButton={e => { }}
            onSave={e => { }}
          />
        )
      }
    </div>
  )
}

export default Home