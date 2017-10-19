import React from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Post';

const post = {
  category: "react",
  id: "8xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn React",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 6
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Post post={post}/>, div);
});
