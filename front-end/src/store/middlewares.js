import { returnPosts, returnPost, requestRedirect } from './actions'
import ReadableAPI from '../ReadableAPI'
import { isNewPost } from '../components/PostModal'
import { isNewComment } from '../components/PostCommentModal'

export const appMiddleware = store => next => action => {
  const isOkRequestScreenRefrech = (success, url) => {
    store.dispatch(requestRedirect(url))
  }
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { redirectUrl } = action
      const { searchPosts, postsOrder } = store.getState().appProps
      //Get Posts
      ReadableAPI.getPosts(searchPosts, postsOrder).then((posts) => {
        //Get Categories 
        ReadableAPI.getCategories().then((data) => {
          store.dispatch(returnPosts(posts, data.categories, redirectUrl))
        })
      })
      return next(action)
    }
    case 'REQUEST_POSTS_BY_CATEGORY': {
      const { category, redirectUrl } = action
      const { searchPosts, postsOrder } = store.getState().appProps
      //Get Posts
      ReadableAPI.getPostsByCategory(category, searchPosts, postsOrder).then((posts) => {
        //Get Categories 
        ReadableAPI.getCategories().then((data) => {
          store.dispatch(returnPosts(posts, data.categories, redirectUrl))
        })
      })
      return next(action)
    }
    case 'REQUEST_POST': {
      const { postId, redirectUrl } = action
      const { commentsOrder } = store.getState().appProps
      //Get post
      ReadableAPI.getPost(postId).then((post) => {
        //Get comments
        ReadableAPI.getComments(postId, commentsOrder).then((comments) => {
          store.dispatch(returnPost(post, comments, redirectUrl))
        })
      })
      return next(action)
    }
    case 'REQUEST_SAVE_POST': {
      const { post, redirectUrl } = action
      //Request a POST(new Post) or PUT(edit Post) method
      const requestMethod = isNewPost(post) ? ReadableAPI.newPost : ReadableAPI.editPost
      requestMethod(post).then(response => {
        isOkRequestScreenRefrech(response.ok, redirectUrl)
      })
      return next(action)
    }
    case 'REQUEST_DELETE_POST': {
      const { postId, redirectUrl } = action
      ReadableAPI.deletePost(postId).then(response => {
        isOkRequestScreenRefrech(response.ok, redirectUrl)
      })
      return next(action)
    }
    case 'REQUEST_VOTE_SCORE_POST': {
      const { postId, option, redirectUrl } = action
      ReadableAPI.voteScorePost(postId, option).then(response => {
        isOkRequestScreenRefrech(response.ok, redirectUrl)
      })
      return next(action)
    }
    case 'REQUEST_SAVE_COMMENT': {
      const { comment, redirectUrl } = action
      //Request a POST(new Comment) or PUT(edit Comment) method
      const requestMethod = isNewComment(comment) ? ReadableAPI.newComment : ReadableAPI.editComment
      requestMethod(comment).then(response => {
        isOkRequestScreenRefrech(response.ok, redirectUrl)
      })
      return next(action)
    }
    case 'REQUEST_DELETE_POST_COMMENT': {
      const { commentId, redirectUrl } = action
      ReadableAPI.deleteComment(commentId).then(response => {
        isOkRequestScreenRefrech(response.ok, redirectUrl)
      })
      return next(action)
    }
    case 'REQUEST_CHANGE_ORDER_POSTS': {
      const { redirectUrl } = action
      store.dispatch(requestRedirect(redirectUrl))
      return next(action)
    }
    case 'REQUEST_VOTE_SCORE_POST_COMMENT': {
      const { commentId, option, redirectUrl } = action
      ReadableAPI.voteScoreComment(commentId, option).then(response => {
        isOkRequestScreenRefrech(response.ok, redirectUrl)
      })
      return next(action)
    }
    default:
      return next(action)

  }
}