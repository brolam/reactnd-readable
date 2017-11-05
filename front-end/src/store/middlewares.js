import { returnPosts } from './actions'


export const homeMiddleware = store => next => action => {
  switch (action.type) {
    case 'REQUEST_POSTS': {
      //const { search } = action
      store.dispatch(returnPosts(posts, categories))
      return next(action)
    }
    default:
      return next(action)
    
  }
}

const categories = ['udacity', 'react', 'redux']

const posts = [{
  category: "udacity",
  id: "7ni6ok3ym7mf1p33lnez",
  title: "Udacity is the best place to learn technology.",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
},
{
  category: "react",
  id: "8xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn React",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
},
{
  category: "redux",
  id: "7xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn Redux",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}]