const api = "http://localhost:3001/"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = global.localStorage.token
if (!token)
  token = global.localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

function newId() {
  return Math.random().toString(36).substr(-15)
}

let ReadableAPI = {};

const comparePostsOrderBy = function (post, nextPost, postsOrder) {
  if (postsOrder === 'publishedDate') {
    return nextPost.timestamp - post.timestamp
  }
  return nextPost.voteScore - post.voteScore
}

ReadableAPI.getPosts = (search, postsOrder) =>
  fetch(`${api}posts/`, { headers })
    .then(res => res.json())
    .then(posts => posts.sort(
      (post, nextPost) => comparePostsOrderBy(post, nextPost, postsOrder)
    ))

ReadableAPI.getPostsByCategory = (category) =>
  fetch(`${api}${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

ReadableAPI.getCategories = () =>
  fetch(`${api}categories/`, { headers })
    .then(res => res.json())
    .then(data => data)


ReadableAPI.getPost = (postId) =>
  fetch(`${api}posts/${postId}`, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => data)

ReadableAPI.newPost = (post) =>
  fetch(`${api}posts/`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: newId(), ...post })
    }).then(response => response)

ReadableAPI.editPost = (post) =>
  fetch(`${api}posts/${post.id}`,
    {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(response => response)

ReadableAPI.deletePost = (postId) =>
  fetch(`${api}posts/${postId}`, { method: 'DELETE', headers })
    .then(response => response)

ReadableAPI.voteScorePost = (postId, option) =>
  fetch(`${api}posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(response => response)

ReadableAPI.getComments = (postId) =>
  fetch(`${api}posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

ReadableAPI.newComment = (comment) =>
  fetch(`${api}comments/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: newId(), ...comment })
  }).then(response => response)

ReadableAPI.editComment = (comment) =>
  fetch(`${api}comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(response => response)

ReadableAPI.deleteComment = (commentId) =>
  fetch(`${api}comments/${commentId}`, { method: 'DELETE', headers })
    .then(response => response)

ReadableAPI.voteScoreComment = (commentId, option) =>
  fetch(`${api}comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(response => response)

export default ReadableAPI;

