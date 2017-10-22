import React from 'react';
import PostForm from '../components/PostForm';
import ReactDOM from 'react-dom';
import { PostFormButtonShow } from '../components/PostForm'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <PostForm categories={['udacity', 'react', 'redux']} />
      <div className="add-button">
        <PostFormButtonShow className="post" title="Add New Post" post='{"title": "New Post", "postTitle":"", "postBody": ""}' />
      </div>
    </div>, div);
});