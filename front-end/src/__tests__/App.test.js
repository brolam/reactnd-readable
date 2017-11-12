import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import App from '../App';
import { Provider } from 'react-redux'
import store from '../store'
import { buildNewPost } from '../components/PostModal'

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
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
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
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>)
  })

  it('select first post', () => {
    selectTheFirstPost(app)
  })

  it('back to homepage', () => {
    selectTheFirstPost(app)
    const backButton = app.find('[className="post-page-header-back"]')
    backButton.simulate('click')
    const homePage = app.find('div [className="main-page-header"]')
    expect(homePage.length).toBe(1)
  })

  it('show edit post form modal', () => {
    selectTheFirstPost(app)
    showFormEditPost(app)
  })

  test('close edit post form modal', () => {
    selectTheFirstPost(app)
    showFormEditPost(app)
    closeFormModalPost(app)
  })

  test('edit and save first post', () => {
    selectTheFirstPost(app)
    showFormEditPost(app)
    const { inputTitle, inputBody, buttonSave } = getPostModalInputs(app)
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = '1'.repeat(500)
    buttonSave.simulate('click') //Save edited post  
    const postEdited = posts[0]; //Get the first post updated.
    posts = [...global.dataForTest.posts] //Rollback public posts list.
    expect(inputTitle.instance().value).toEqual(postEdited.title)
    expect(inputBody.instance().value).toEqual(postEdited.body)
  })

});

describe("Delete post", () => {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>)
  })

  test('show post delete question', () => {
    selectTheFirstPost(app)
    const deleteButton = app.find('button [className="delete-button"]')
    deleteButton.simulate('click')
    expect(app.find('h1').text()).toBe('Are you sure? Do you want delete this post?  Yes?  or No?')
  })

})

const categories = global.dataForTest.categories
let posts = [...global.dataForTest.posts]
//Mocked fetch
global.fetch = (url, body) => new Promise(function (then) {
  //console.log(url, body)
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
  //Edit post
  if ((url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez') && body.method === 'PUT')
    posts[0] = { ...posts[0], ...JSON.parse(body.body) }
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
  let buttonSave = app.find('div [className="modal-footer"] select');
  if (buttonSave.length === 0) //when editing post
    buttonSave = app.find('div [className="modal-footer"] button');
  return {
    inputTitle: app.find('div [className="modal-heard modal-post"] input'),
    inputBody: app.find('div [className="modal-content modal-post"] textarea'),
    buttonSave: buttonSave,
  }
}