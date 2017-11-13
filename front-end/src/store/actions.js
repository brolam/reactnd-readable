//Posts
export function requestPosts(search, redirectUrl = null) {
  return {
    type: 'REQUEST_POSTS',
    search,
    redirectUrl
  }
}

export function returnPosts(posts, categories, redirectUrl = null) {
  return {
    type: 'RETURN_POSTS',
    posts,
    categories,
    redirectUrl
  }
}

//Post
export function requestPost(postId, redirectUrl = null) {
  return {
    type: 'REQUEST_POST',
    postId,
    redirectUrl
  }
}

export function returnPost(post, comments, redirectUrl = null) {
  return {
    type: 'RETURN_POST',
    post,
    comments,
    redirectUrl
  }
}

export function requestSavePost(post, redirectUrl = null) {
  return {
    type: 'REQUEST_SAVE_POST',
    post,
    redirectUrl
  }
}

export function requestDeletePost(postId, redirectUrl = null) {
  return {
    type: 'REQUEST_DELETE_POST',
    postId,
    redirectUrl
  }
}

//app
export function cleanRedirectUrl() {
  return {
    type: 'CLEAN_REDIRECT_URL',
    redirectUrl: null
  }
}
