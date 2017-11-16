import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import App from '../App';
import { Provider } from 'react-redux'
import store from '../store'
import { buildNewPost } from '../components/PostModal'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
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
      rollbackPublicPostsList()
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

  it('show post delete question', () => {
    showDeleteQuestionForFirstPost(app)
  })

  it('click No in post delete question', () => {
    showDeleteQuestionForFirstPost(app)
    app.find('a [className="no"]').simulate('click')
    expect(app.find('div [className="modal-short modal-open"] h1').length).toBe(0)
  })

  it('delete post', () => {
    showDeleteQuestionForFirstPost(app)
    app.find('a [className="yes"]').simulate('click')
    expect(posts.length).toBe(2); //test number of posts
    rollbackPublicPostsList()
  })

})

describe("Vote Score post", () => {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>)
      rollbackPublicPostsList()
  })

  it('like in home page', () => {
    const currentVoteScore = posts[0].voteScore
    app.find('button [className="liked"]').first().simulate('click')
    expect(posts[0].voteScore).toEqual(currentVoteScore + 1)
    
  })

  it('not like in home page', () => {
    const currentVoteScore = posts[0].voteScore
    app.find('button [className="not-liked"]').first().simulate('click')
    expect(posts[0].voteScore).toEqual(currentVoteScore - 1)
  })

  it('like in post page', () => {
    selectTheFirstPost(app)
    const currentVoteScore = posts[0].voteScore
    app.find('.post-page-header-buttons button [className="liked"]').simulate('click')
    expect(posts[0].voteScore).toEqual(currentVoteScore + 1)
  })

  it('not like in post page', () => {
    selectTheFirstPost(app)
    const currentVoteScore = posts[0].voteScore
    app.find('.post-page-header-buttons button [className="not-liked"]').simulate('click')
    expect(posts[0].voteScore).toEqual(currentVoteScore - 1)
  })
})

describe("New comment", () => {
  let app
  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>)
  })

  it('show form modal new comment', () => {
    selectTheFirstPost(app)
    showFormNewComment(app)
  })

  it('close form modal new comment', () => {
    selectTheFirstPost(app)
    showFormNewComment(app)
    const backButton = app.find('div [className="modal-heard"] span');
    backButton.simulate('click');
    expect(app.find('div [id="commentModal"]').length).toEqual(0);
  })

  it('save new comment', () => {
    selectTheFirstPost(app)
    showFormNewComment(app)
    const inputBody = app.find('textarea')
    inputBody.instance().value = 'New Post comment'
    app.find('button [className="save-button udacity"]').simulate('click');
    expect(posts[0].comments[2].body).toBe('New Post comment')
    rollbackPublicPostsList()
  })
})

describe("Edit comment", () => {
  let app
  beforeEach(() => {
    store.dispatch({ type: 'CLEAN_REDIRECT_URL', redirectUrl: null })
    app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts/7ni6ok3ym7mf1p33lnez/get']}>
          <App />
        </MemoryRouter>
      </Provider>)
    rollbackPublicPostsList()
  })

  it('show form modal edit comment', () => {
    showFormEditFirstComment(app)
  })

  it('save edited comment', () => {
    showFormEditFirstComment(app)
    const commentBody = app.find('#commentModal textarea')
    commentBody.instance().value = 'Body value was edited'
    app.find('#commentModal [className="save-button udacity"]').simulate('click');
    const editedComment = posts[0].comments[0]
    expect(editedComment.body).toBe('Body value was edited')
  })

})

describe("Delete comment", () => {
  let app
  beforeEach(() => {
    store.dispatch({ type: 'CLEAN_REDIRECT_URL', redirectUrl: null })
    app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts/7ni6ok3ym7mf1p33lnez/get']}>
          <App />
        </MemoryRouter>
      </Provider>)
    rollbackPublicPostsList()
  })

  it('show question modal delete first comment', () => {
    showDeleteQuestionForFirstComment(app)
  })

  it('answer no to delete first comment', () => {
    showDeleteQuestionForFirstComment(app)
    app.find('.modal-short-dialog [className="no"]').simulate('click')
    expect(app.find('.modal-short-dialog').length).toBe(0)
  })

  it('answer yes to delete first comment', () => {
    showDeleteQuestionForFirstComment(app)
    const amountBeforDelete = posts[0].comments.length
    app.find('.modal-short-dialog [className="yes"]').simulate('click')
    expect(posts[0].comments.length).toBe(amountBeforDelete - 1)
  })
})

describe("Vote Score post comment", () => {
  let app
  beforeEach(() => {
    store.dispatch({ type: 'CLEAN_REDIRECT_URL', redirectUrl: null })
    app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts/7ni6ok3ym7mf1p33lnez/get']}>
          <App />
        </MemoryRouter>
      </Provider>)
    rollbackPublicPostsList()
  })

  it('like first comment', () => {
    const currentVoteScore = posts[0].comments[0].voteScore
    app.find('.post-comment .liked').first().simulate('click')
    expect(posts[0].comments[0].voteScore).toBe(currentVoteScore + 1)
  })

  it('not like first comment', () => {
    const currentVoteScore = posts[0].comments[0].voteScore
    app.find('.post-comment .not-liked').first().simulate('click')
    expect(posts[0].comments[0].voteScore).toBe(currentVoteScore - 1)
  })
})

describe("Post categories filter", () => {
  let app
  beforeEach(() => {
    store.dispatch({ type: 'CLEAN_REDIRECT_URL', redirectUrl: null })
    app = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>)
    rollbackPublicPostsList()
  })

  it('filter by category udacity', () => {
    const postCategoriesFilter = app.find('.main-page-header-title select')
    const event = { target: { value: 'udacity' } };
    postCategoriesFilter.simulate('change', event);
    expect(posts.length).toBe(1)
  })

})

const categories = global.dataForTest.categories
let posts = [...global.dataForTest.posts]
//Mocked fetch
global.fetch = (url, body) => new Promise(function (then) {
  //Default return
  let res = undefined

  //All posts 
  if (url === 'http://localhost:3001/posts/') res = { json: () => posts }

  //posts by Udacity category 
  if (url === 'http://localhost:3001/udacity/posts') {
    posts = [posts[0]]
    res = { json: () => posts }
  }

  //All categories
  if (url === 'http://localhost:3001/categories/') {
    res = { json: () => { let data = { categories: categories }; return (data) } }
  }

  //New post
  if ((url === 'http://localhost:3001/posts/') && body.method === 'POST') {
    res = { ok: true }
    posts = [...posts, JSON.parse(body.body)]
  }

  //Edit post
  if ((url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez') && (body.method === 'PUT')) {
    res = { ok: true }
    posts[0] = { ...posts[0], ...JSON.parse(body.body) }
  }

  //Get Post 
  if (url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez' && (body.method === 'GET')) res = { json: () => posts[0] }

  //Get Comments
  if (url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez/comments') res = { json: () => posts[0].comments }

  //Delete Post
  if (url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez' && (body.method === 'DELETE')) {
    posts = posts.splice(1, 2);
    res = { ok: true }
  }
  //Like Post
  if (url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez' && (body.method === 'POST') && (body.body === '{"option":"upVote"}')) {
    posts[0].voteScore = posts[0].voteScore + 1
    res = { ok: true }
  }

  //Not Like Post
  if (url === 'http://localhost:3001/posts/7ni6ok3ym7mf1p33lnez' && (body.method === 'POST') && (body.body === '{"option":"downVote"}')) {
    posts[0].voteScore = posts[0].voteScore - 1
    res = { ok: true }
  }

  //New Comment
  if (url === 'http://localhost:3001/comments/' && (body.method === 'POST')) {
    posts[0].comments = [...posts[0].comments, JSON.parse(body.body)]
    res = { ok: true }
  }

  //Edit Comment
  if (url === 'http://localhost:3001/comments/894tuq4ut84ut8v4t8wun89g' && (body.method === 'PUT')) {
    posts[0].comments[0] = JSON.parse(body.body)
    res = { ok: true }
  }

  //Delete Comment
  if (url === 'http://localhost:3001/comments/894tuq4ut84ut8v4t8wun89g' && (body.method === 'DELETE')) {
    posts[0].comments.splice(0, 1);
    res = { ok: true }
  }

  //Like Comment
  if (url === 'http://localhost:3001/comments/8tu4bsun805n8un48ve89' && (body.method === 'POST') && (body.body === '{"option":"upVote"}')) {
    posts[0].comments[0].voteScore = posts[0].comments[0].voteScore + 1
    res = { ok: true }
  }

  //Not Like Comment
  if (url === 'http://localhost:3001/comments/8tu4bsun805n8un48ve89' && (body.method === 'POST') && (body.body === '{"option":"downVote"}')) {
    posts[0].comments[0].voteScore = posts[0].comments[0].voteScore - 1
    res = { ok: true }
  }

  if (!res) console.log('Untreated Requisition:', url, body)
  then(res ? res : { json: {}, ok: false });
});

function showDeleteQuestionForFirstComment(app) {
  const selectedFirstComment = app.find('div [className="post-comment"]').first()
  selectedFirstComment.find('.delete-button').simulate('click')
  expect(
    app.find('div [className="modal-short modal-open"] h1').text()
  ).toBe('Are you sure? Do you want delete this comment?Yes? or No?')
}

function showFormNewComment(app) {
  app.find('div [className="flat-button"]').simulate('click')
  expect(app.find('div [id="commentModal"]').length).toEqual(1);
}

function rollbackPublicPostsList() {
  posts = [...global.dataForTest.posts] //Rollback public posts list.
}

function showFormEditFirstComment(app) {
  const selectedFirstComment = app.find('div [className="post-comment"]').first()
  selectedFirstComment.find('.edit-button').simulate('click')
  const selectedComment = posts[0].comments[0]
  expect(app.find('#commentModal textarea').instance().value
  ).toEqual(selectedComment.body);
}

function showDeleteQuestionForFirstPost(app) {
  selectTheFirstPost(app)
  const deleteButton = app.find('.post-page-header-buttons button [className="delete-button"]')
  deleteButton.simulate('click')
  expect(app.find('div [className="modal-short modal-open"] h1').text()).toBe('Are you sure? Do you want delete this post? Yes? or No?')
}

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
  const editButton = app.find('.post-page-header-buttons button [className="edit-button"]')
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