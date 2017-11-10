import { combineReducers } from 'redux'

const HOME_INITIAL_STATE = {
  posts: [],
  categories: [],
  isShowWaitProcessModal: false,
  redirectUrl: null
};

function app(state = {}, action) {
  switch (action.type) {
    case 'CLEAN_REDIRECT_URL': {
      return { ...state, redirectUrl: null, isShowWaitProcessModal: false }
    }
    default:
      return state
  }
}

function home(state = HOME_INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { search, redirectUrl } = action
      return { ...state, search, isShowWaitProcessModal: true, redirectUrl }
    }
    case 'REQUEST_SAVE_POSTS': {
      const { post, redirectUrl } = action
      return { ...state, post, isShowWaitProcessModal: true, redirectUrl }
    }
    case 'RETURN_POSTS': {
      const { posts, categories, redirectUrl } = action
      return { ...state, posts, categories, isShowWaitProcessModal: false, redirectUrl }
    }
    case 'CLEAN_REDIRECT_URL': {
      return { ...state, redirectUrl: null, isShowWaitProcessModal: false }
    }
    default:
      return state
  }
}

export default combineReducers({ app, home })