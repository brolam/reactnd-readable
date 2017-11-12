import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import App from '../App';
import { Provider } from 'react-redux'
import store from '../store'
import { newPost } from '../components/PostModal'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, div);
});

describe("New post", () => {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>)
  })

  it('show new post form modal', () => {
    showFormModalNewPost(app)
  })

  it('close new post form modal', () => {
    showFormModalNewPost(app)
    closeFormModalPost(app)
  })

  it('save a post', () => {
    showFormModalNewPost(app)
    const { inputTitle, inputBody, buttonSave } = getPostModalInputs(app)
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = '1'.repeat(500)
    buttonSave.instance().value = 'udacity'
    const post = newPost(inputTitle.instance().value, inputBody.instance().value, buttonSave.instance().value)
    buttonSave.simulate('change') //Save post  
    const postAdded = posts.pop(); //Remove the last post added.
    expect(inputTitle.instance().value).toEqual(postAdded.title)
    expect(inputBody.instance().value).toEqual(postAdded.body)
    expect(buttonSave.instance().value).toEqual(postAdded.category)
  })

  it('do not save invalid post', () => {
    showFormModalNewPost(app)
    const { inputTitle, inputBody, buttonSave } = getPostModalInputs(app)
    inputTitle.instance().value = '1'.repeat(81) // invalid title  
    inputBody.instance().value = '1'.repeat(501) // invalid body
    buttonSave.instance().value = 'udacity';
    buttonSave.simulate('change');
    expect(app.find('div [id="postModal"]').length).toEqual(1); //Modal Form new Post still opening
    expect(app.find('div [className="post"]').length).toBe(3); //test number of posts
  })
});

describe("Edit post", () => {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>)
  })

  it('select first post', () => {
    selectTheFirstPost(app)
  })

  test('back to homepage', () => {
    const backButton = app.find('[className="post-page-header-back"]')
    backButton.simulate('click')
    const homePage = app.find('div [className="main-page-header"]')
    expect(homePage.length).toBe(1)
  })

  test('show edit post form modal', () => {
    selectTheFirstPost(app)
    showFormEditPost(app)
  })

  test('close edit post form modal', () => {
    showFormEditPost(app)
    closeFormModalPost(app)
  })


});

const categories = global.dataForTest.categories
let posts = [...global.dataForTest.posts]
//Mocked fetch
global.fetch = (url, body) => new Promise(function (then) {
  let res = { json: () => { } }
  //All posts 
  if (url === 'http://localhost:3001/posts/') res = { json: () => posts }
  //All categories
  if (url === 'http://localhost:3001/categories/') {
    res = { json: () => { let data = { categories: categories }; return (data) } }
  }
  //New post
  if ((url === 'http://localhost:3001/posts/') && body.method === 'POST')
    posts = [...posts, JSON.parse(body.body)]
  //Get Post 
  if (url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez') res = { json: () => posts[0] }
  if (url === 'http://localhost:3001/posts/comments') res = { json: () => posts[0].comments }
  then(res);
});

function closeFormModalPost(app) {
  const backButton = app.find('div [className="modal-heard modal-post"] span');
  expect(backButton.length).toEqual(1);
  backButton.simulate('click');
}

function selectTheFirstPost(app) {
  const selectedFirstPost = app.find('div [className="post"]').first()
  selectedFirstPost.simulate('click')
  const postPage = app.find('div [className="post-page-header"]')
  expect(postPage.length).toBe(1)
}

function showFormEditPost(app) {
  const editButton = app.find('button [className="edit-button"]')
  editButton.simulate('click')
  expect(app.find('div [id="postModal"]').length).toEqual(1);
}

function showFormModalNewPost(app) {
  const newPostButton = app.find('.flat-button');
  expect(newPostButton.length).toEqual(1);
  newPostButton.simulate('click');
  expect(app.find('div [id="postModal"]').length).toEqual(1);
}

function getPostModalInputs(app) {
  return {
    inputTitle: app.find('div [className="modal-heard modal-post"] input'),
    inputBody: app.find('div [className="modal-content modal-post"] textarea'),
    buttonSave: app.find('div [className="modal-footer"] select'),
  }
}