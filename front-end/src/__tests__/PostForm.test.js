import React from 'react';
import PostForm from '../components/PostForm';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import '../bootstrapSetup.js';
import { mount } from 'enzyme';
import { PostFormButtonShow, postFormConfigEvents } from '../components/PostForm'

const $ = window.jQuery;

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

test('last Snapshot New Post', () => {
  const postCard = mount(
    <div>
      <PostForm categories={['udacity', 'react', 'redux']} />
      <div className="add-button">
        <PostFormButtonShow className="post" title="Add New Post" post='{"title": "New Post", "postTitle":"", "postBody": ""}' />
      </div>
    </div>
  );
  postFormConfigEvents(postCard.find('#postForm'));
  postCard.find('a').simulate('click');
  console.log($(postCard.find('#postForm')));
  expect(postCard).toMatchSnapshot();
});