import { requestPosts, returnPosts, returnPost } from './actions'
import ReadableAPI from '../ReadableAPI'

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
      //Post the post :)
      ReadableAPI.newPost(post).then(response => {
        response.ok && store.dispatch(requestPosts('', redirectUrl))
      })
      return next(action)
    }
    default:
      return next(action)

  }
}