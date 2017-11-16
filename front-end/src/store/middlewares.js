import { requestPosts, returnPosts, returnPost, requestPost } from './actions'
import ReadableAPI from '../ReadableAPI'
import { isNewPost } from '../components/PostModal'
import { isNewComment } from '../components/PostCommentModal'

export const appMiddleware = store => next => action => {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { search, redirectUrl } = action
      //Get Posts
      ReadableAPI.getPosts(search).then((posts) => {
        //Get Categories 
        ReadableAPI.getCategories().then((data) => {
          store.dispatch(returnPosts(posts, data.categories, redirectUrl))
        })
      })
      return next(action)
    }
    case 'REQUEST_POSTS_BY_CATEGORY': {
      const { category, redirectUrl } = action
      //Get Posts
      ReadableAPI.getPostsByCategory(category).then((posts) => {
        //Get Categories 
        ReadableAPI.getCategories().then((data) => {
          store.dispatch(returnPosts(posts, data.categories, redirectUrl))
        })
      })
      return next(action)
    }
    case 'REQUEST_POST': {
      const { postId, redirectUrl } = action
      //Get post
      ReadableAPI.getPost(postId).then((post) => {
        //Get comments
        ReadableAPI.getComments(postId).then((comments) => {
          store.dispatch(returnPost(post, comments, redirectUrl))
        })
      })
      return next(action)
    }
    case 'REQUEST_SAVE_POST': {
      const { post, redirectUrl } = action
      //Request a POST(new Post) or PUT(edit Post) method
      const requestMethod = isNewPost(post) ?
        ReadableAPI.newPost :
        ReadableAPI.editPost
      requestMethod(post).then(response => {
        if (!response.ok) return
        store.dispatch(requestPosts('', redirectUrl))
        if (!isNewPost(post)) store.dispatch(requestPost(post.id)) //Update selected posts.
      })
      return next(action)
    }
    case 'REQUEST_DELETE_POST': {
      const { postId, redirectUrl } = action
      ReadableAPI.deletePost(postId).then(response => {
        if (response.ok) store.dispatch(requestPosts('', redirectUrl))
      })
      return next(action)
    }
    case 'REQUEST_VOTE_SCORE_POST': {
      const { postId, option } = action
      ReadableAPI.voteScorePost(postId, option).then(response => {
        if (!response.ok) return
        store.dispatch(requestPosts('')) //Update posts 
        store.dispatch(requestPost(postId)) // Update selected posts
      })
      return next(action)
    }
    case 'REQUEST_SAVE_COMMENT': {
      const { postId, comment, redirectUrl } = action
      //Request a POST(new Comment) or PUT(edit Comment) method
      const requestMethod = isNewComment(comment) ?
        ReadableAPI.newComment :
        ReadableAPI.editComment
      requestMethod(comment).then(response => {
        if (response.ok) store.dispatch(requestPost(postId, redirectUrl)) // Update selected posts
      })
      return next(action)
    }
    case 'REQUEST_DELETE_POST_COMMENT': {
      const { postId, commentId, redirectUrl } = action
      ReadableAPI.deleteComment(commentId).then(response => {
        if (response.ok) store.dispatch(requestPost(postId, redirectUrl)) // Update selected posts
      })
      return next(action)
    }
    case 'REQUEST_VOTE_SCORE_POST_COMMENT': {
      const { postId, commentId, option, redirectUrl } = action
      ReadableAPI.voteScoreComment(commentId, option).then(response => {
        if (!response.ok) return
        store.dispatch(requestPost(postId, redirectUrl) ) // Update selected posts
      })
      return next(action)
    }
    default:
      return next(action)

  }
}