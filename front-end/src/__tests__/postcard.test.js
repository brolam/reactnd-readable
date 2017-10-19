import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PostCard from '../components/PostCard';
import { getColorClass } from '../components/PostCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostCard post={postReact} onClick = {onClick} />, div);
});

test('last Snapshot category Udacity ', () => {
  const postCard = renderer.create(
    <PostCard post={postUdacity} onClick = {onClick} />
  );
  let tree = postCard.toJSON();
  expect(tree).toMatchSnapshot();
});

test('last Snapshot category React ', () => {
  const postCard = renderer.create(
    <PostCard post={postReact} onClick = {onClick} />
  );
  let tree = postCard.toJSON();
  expect(tree).toMatchSnapshot();
});

test('last Snapshot category Redux ', () => {
  const postCard = renderer.create(
    <PostCard post={postRedux} onClick = {onClick} />
  );
  let tree = postCard.toJSON();
  expect(tree).toMatchSnapshot();
});

test('last Snapshot wrong category', () => {
  const postCard = renderer.create(
    <PostCard post={postWrongCategory} onClick = {onClick} />
  );
  let tree = postCard.toJSON();
  expect(tree).toMatchSnapshot();
});

const postUdacity = {
  category: "udacity",
  id: "7ni6ok3ym7mf1p33lnez",
  title: "Udacity is the best place to learn technology.",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}

const onClick = () =>{

} 

const postReact = {
  category: "react",
  id: "8xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn React",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}

const postRedux = {
  category: "redux",
  id: "7xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn Redux",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}

const postWrongCategory = {
  category: "xxxxxx",
  id: "7xf0y6ziyjabvozdd253nd",
  title: "Udacity is the best place to learn Redux",
  timestamp: 1467166872634,
  author: "thingtwo",
  body: "Everyone says so after all.",
  deleted: false,
  voteScore: 5
}
