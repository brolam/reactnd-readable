import { combineReducers } from 'redux'

const HOME_INITIAL_STATE = {
  posts: [],
  categories: [],
  isShowWaitProcessModal: false,
};

function home(state = HOME_INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { search } = action
      return { ...state, search, isShowWaitProcessModal: true }
    }
    case 'RETURN_POSTS': {
      const { posts, categories } = action
      return {...state, posts, categories, isShowWaitProcessModal: false }
    }
    default:
      return state
  }
}

export default combineReducers({ home })