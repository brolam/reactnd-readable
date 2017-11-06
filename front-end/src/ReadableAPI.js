const api = "http://localhost:3001/"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = global.localStorage.token
if (!token)
  token = global.localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

let ReadableAPI = {};

ReadableAPI.getPosts = (search) =>
  fetch(`${api}posts/`, { headers })
    .then(res => res.json())
    .then(data => data)

ReadableAPI.getCategories = () =>
    fetch(`${api}categories/`, { headers })
      .then(res => res.json())
      .then(data => data)
  

export default ReadableAPI;

