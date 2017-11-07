import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { mount, shallow } from 'enzyme'
import App from '../App';
import { Provider } from 'react-redux'
import store from '../store'

const categories = global.dataForTest.categories
const posts = global.dataForTest.posts

it('renders without crashing', () => {
  fetch.mockResponseOnce(JSON.stringify(posts))
  fetch.mockResponseOnce(JSON.stringify({ categories }))
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, div);
});

describe("Show and Close new post form", () => {
  fetch.mockResponseOnce(JSON.stringify(posts))
  fetch.mockResponseOnce(JSON.stringify({ categories }))
  const app = mount(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>)

  it('show new post form modal', () => {
    const newPostButton = app.find('.flat-button');
    expect(newPostButton.length).toEqual(1);
    newPostButton.simulate('click');
    expect(app.find('div [id="postModal"]').length).toEqual(1);
  })

  it('close new post form modal', () => {
    const backButton = app.find('div [className="modal-heard modal-post"] span');
    expect(backButton.length).toEqual(1);
    backButton.simulate('click');
    expect(app.find('div [id="postModal"]').length).toEqual(0);
  })
});