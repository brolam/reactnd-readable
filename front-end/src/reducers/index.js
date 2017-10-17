import { GET_POSTS } from '../actions/index.js'

export function post(state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            const { posts } = action
            return { ...state, posts }
        default:
            return state
    }
}