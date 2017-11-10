import { requestPosts, returnPosts } from './actions'
import ReadableAPI from '../ReadableAPI'

export const homeMiddleware = store => next => action => {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { search, redirectUrl } = action
      ReadableAPI.getPosts(search).then((posts) => {
        ReadableAPI.getCategories().then((data) => {
          store.dispatch(returnPosts(posts, data.categories, redirectUrl))
        })
      })
      return next(action)
    }
    case 'REQUEST_SAVE_POST': {
      const { post, redirectUrl } = action
      ReadableAPI.newPost(post).then(response => {
        response.ok && store.dispatch(requestPosts('', redirectUrl))
      })
      return next(action)
    }
    default:
      return next(action)

  }
}