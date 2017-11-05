import { combineReducers } from 'redux'

const HOME_INITIAL_STATE = {
  posts: [],
  categories: [],
  isShowWaitMessage: false,
};

function home(state = HOME_INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { search } = action
      return { ...state, search, isShowWaitMessage: true }
    }
    case 'RETURN_POSTS': {
      const { posts, categories } = action
      return {...state, posts, categories, isShowWaitMessage: false }
    }
    default:
      return state
  }
}

export default combineReducers({ home })