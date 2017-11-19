import React from 'react'
import ReactDOM from 'react-dom'
import PostModal from '../components/PostModal'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import {reportValidity} from '../components/utils/FormReportValidity'

const categories = global.dataForTest.categories
const postUdacity = global.dataForTest.posts[0]

test('render without error', () => {
  ReactDOM.render(
    <PostModal
      post={postUdacity}
      categories={categories}
      onClickBackButton={e => { }}
      onSavePost={fieldsWasValidated => { }}
    />, document.createElement('div'));
})

test('last Snapshot to new Post', () => {
  const postModal = renderer.create(
    <PostModal
      post={{}}
      categories={categories}
      onClickBackButton={e => { }}
      onSavePost={fieldsWasValidated => { }}
    />);
  let tree = postModal.toJSON();
  expect(tree).toMatchSnapshot();
})

test('last Snapshot to edit Post', () => {
  const postModal = renderer.create(
    <PostModal
      post={postUdacity}
      categories={categories}
      onClickBackButton={e => { }}
      onSavePost={fieldsWasValidated => { }}
    />);
  let tree = postModal.toJSON();
  expect(tree).toMatchSnapshot();
})

describe("New Post to valid and to save", () => {
  let postModal, inputTitle, inputBody, buttonSavePost
  let { isClikedBackButton, didTheSaveEvent, areTheFieldsValidated } = false

  beforeEach(() => {
    postModal = mount(
      <PostModal
        post={{}}
        onClickBackButton={e => { isClikedBackButton = true }}
        categories={categories}
        onSavePost={fieldsWasValidated => {
          didTheSaveEvent = true
          areTheFieldsValidated = fieldsWasValidated
        }}
      />);
    isClikedBackButton = false;
    didTheSaveEvent = false;
    areTheFieldsValidated = false;
    inputTitle = postModal.find('div [className="modal-heard modal-post"] input')
    inputBody = postModal.find('div [className="modal-content modal-post"] textarea')
    buttonSavePost = postModal.find('div [className="modal-footer"] select')
    buttonSavePost.instance().value = 'udacity'
  });

  test('input title is focusing', () => {
    const elementFocusing = document.activeElement
    expect(inputTitle.instance() === elementFocusing).toBe(true);
  })

  test('title is required', () => {
    inputTitle.instance().value = ' '
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toBe(false);
  })

  test('title must be longer than 10 characters', () => {
    inputTitle.instance().value = '123456789'
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated, ).toEqual(false);
  })

  test('title must be less than 80 characters', () => {
    inputTitle.instance().value = '1'.repeat(81)
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toEqual(false);
  })

  test('body is required', () => {
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = ' '
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toBe(false);
  })

  test('do not save when category is none', () => {
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = '1'.repeat(500)
    buttonSavePost.instance().value = 'none'
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toBe(false);
    buttonSavePost.instance().value = 'udacity'
  })

  test('title must be valid', () => {
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = '1'.repeat(500)
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toEqual(true);
  })

  test('body must be longer than 2 characters', () => {
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = '1'
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated, ).toEqual(false);
  })

  test('body must be less than 500 characters', () => {
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = '1'.repeat(501)
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toEqual(false);
  })

  test('body must be valid', () => {
    inputTitle.instance().value = '1'.repeat(80)
    inputBody.instance().value = '1'.repeat(50)
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toEqual(true);
  })

  test('on save event to new Post', () => {
    inputTitle.instance().value = 'Udacity is the best place to learn technology.'
    inputBody.instance().value = '1'.repeat(500)
    postModal.find('select').simulate('change');
    expect(didTheSaveEvent).toBe(true);
    expect(areTheFieldsValidated).toBe(true);
  })

  test('on click back button', () => {
    postModal.find('div [className="modal-heard modal-post"] span').simulate('click')
    expect(isClikedBackButton).toBe(true);
  })
})

describe("Edit post", () => {
  test('on save event to Edit Post', () => {
    let didTheSaveEvent = false;
    const postModal = mount(
      <PostModal
        post={postUdacity}
        categories={categories}
        onClickBackButton={e => { }}
        onSavePost={e => { didTheSaveEvent = true }}
      />);
    postModal.find('button [className="save-button udacity"]').simulate('click');
    expect(didTheSaveEvent).toBe(true);
  })

  test('invalid edit Post', () => {
    let didTheSaveEvent = false;
    const postModal = mount(
      <PostModal
        post={postUdacity}
        categories={categories}
        onClickBackButton={e => { }}
        onSavePost={e => { didTheSaveEvent = true }}
      />);
    const inputBody = postModal.find('textarea')
    inputBody.instance().reportValidity = reportValidity
    inputBody.instance().value = ' '
    postModal.find('button [className="save-button udacity"]').simulate('click');
    expect(didTheSaveEvent).toBe(false);
  })

})

describe("save button", () => {

  let postModal, inputTitle, inputBody, buttonSavePost

  beforeEach(() => {
    postModal = mount(
      <PostModal
        post={{}}
        onClickBackButton={e => { }}
        categories={categories}
        onSavePost={fieldsWasValidated => { }}
      />);
    inputTitle = postModal.find('div [className="modal-heard modal-post"] input')
    inputBody = postModal.find('div [className="modal-content modal-post"] textarea')
    buttonSavePost = postModal.find('div [className="modal-footer"] select')
  })

  it('default value is none', () => {
    expect(buttonSavePost.instance().value).toEqual('none');
  })

  it('return value to none on invalid save', () => {
    buttonSavePost.instance().value = 'udacity'
    postModal.find('select').simulate('change', { target: { value: 'udacity' } });
    expect(buttonSavePost.instance().value).toEqual('none');
  })

})
