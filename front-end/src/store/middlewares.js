import { returnPosts } from './actions'
import ReadableAPI from '../ReadableAPI'

export const homeMiddleware = store => next => action => {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { search } = action
      ReadableAPI.getPosts(search).then((posts) => {
        ReadableAPI.getCategories().then((data) => {
          store.dispatch(returnPosts(posts, data.categories))
        })
      })
      return next(action)
    }
    default:
      return next(action)

  }
}