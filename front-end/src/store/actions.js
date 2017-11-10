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

export function requestSavePost(post, redirectUrl = null) {
  return {
    type: 'REQUEST_SAVE_POST',
    post,
    redirectUrl
  }
}

export function cleanRedirectUrl() {
  return {
    type: 'CLEAN_REDIRECT_URL',
    redirectUrl: null
  }
}
