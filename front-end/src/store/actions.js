export function requestPosts(search) {
  return {
    type: 'REQUEST_POSTS',
    search
  }
}

export function returnPosts(posts, categories) {
  return {
    type: 'RETURN_POSTS',
    posts,
    categories
  }
}
