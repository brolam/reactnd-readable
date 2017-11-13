import { combineReducers } from 'redux'

const HOME_INITIAL_STATE = {
  posts: [],
  categories: [],
  isShowWaitProcessModal: false,
  redirectUrl: null,
  selectedPost: { post: undefined, comments: undefined }
};

function appProps(state = HOME_INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      const { search, redirectUrl } = action
      return { ...state, search, isShowWaitProcessModal: true, redirectUrl }
    }
    case 'REQUEST_SAVE_POST': {
      const { redirectUrl } = action
      return { ...state, isShowWaitProcessModal: true, redirectUrl }
    }
    case 'REQUEST_DELETE_POST': {
      return { ...state, isShowWaitProcessModal: true }
    }
    case 'RETURN_POSTS': {
      const { posts, categories, redirectUrl } = action
      return { ...state, posts, categories, isShowWaitProcessModal: false, redirectUrl }
    }
    case 'REQUEST_POST': {
      const { redirectUrl } = action
      return { ...state, isShowWaitProcessModal: true, redirectUrl }
    }
    case 'RETURN_POST': {
      const { post, comments, redirectUrl } = action
      return {
        ...state,
        selectedPost: { post, comments },
        isShowWaitProcessModal: false,
        redirectUrl
      }
    }
    case 'CLEAN_REDIRECT_URL': {
      return { ...state, redirectUrl: null, isShowWaitProcessModal: false }
    }
    default:
      return state
  }
}

export default combineReducers({ appProps })