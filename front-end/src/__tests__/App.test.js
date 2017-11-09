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

describe("New post", () => {
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

  it('save a post', () => {
    app.find('.flat-button').simulate('click'); //Show modal new post
    const inputTitle = app.find('div [className="modal-heard modal-post"] input')
    const inputBody = app.find('div [className="modal-content modal-post"] textarea')
    const buttonSave = app.find('div [className="modal-footer"] select')
    inputTitle.instance().value = '1'.repeat(80) // valid Title
    inputBody.instance().value = '1'.repeat(500) // valid Body
    buttonSave.instance().value = 'udacity';
    buttonSave.simulate('change');
    expect(app.find('div [id="postModal"]').length).toEqual(0);
  })

  it('do not save post', () => {
    app.find('.flat-button').simulate('click'); //Show modal new post
    const inputTitle = app.find('div [className="modal-heard modal-post"] input')
    const inputBody = app.find('div [className="modal-content modal-post"] textarea')
    const buttonSave = app.find('div [className="modal-footer"] select')
    inputTitle.instance().value = '1'.repeat(81) // invalid title  
    inputBody.instance().value = '1'.repeat(501) // invalid body
    buttonSave.instance().value = 'udacity';
    buttonSave.simulate('change');
    expect(app.find('div [id="postModal"]').length).toEqual(1);
  })
});