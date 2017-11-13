import { requestPosts, returnPosts, returnPost, requestPost } from './actions'
import ReadableAPI from '../ReadableAPI'
import { isNewPost } from '../components/PostModal'

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
      //Request a POST(new Post) or PUT(edit Post) method
      const requestMethod = isNewPost(post) ? ReadableAPI.newPost : ReadableAPI.editPost
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
    default:
      return next(action)

  }
}