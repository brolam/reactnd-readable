import React from 'react'
import ReactDOM from 'react-dom'
import PostModal from '../components/PostModal'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

const categories = global.dataForTest.categories
const postUdacity = global.dataForTest.posts[0]

test('render without error', () => {
  ReactDOM.render(
    <PostModal
      post={postUdacity}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { }}
    />, document.createElement('div'));
})

test('last Snapshot to new Post', () => {
  const postModal = renderer.create(
    <PostModal
      post={{}}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { }}
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
      onSave={e => { }}
    />);
  let tree = postModal.toJSON();
  expect(tree).toMatchSnapshot();
})

describe("New Post to valid and to save", () => {
  let postModal
  let inputTitle
  let { isClikedBackButton, didTheSaveEvent, areTheFieldsValidated } = false

  beforeEach(() => {
    postModal = mount(
      <PostModal
        post={{}}
        onClickBackButton={e => { isClikedBackButton = true }}
        categories={categories}
        onSave={fieldsWasValidated => {
          didTheSaveEvent = true
          areTheFieldsValidated = fieldsWasValidated
        }}
      />);
    isClikedBackButton = false;
    didTheSaveEvent = false;
    areTheFieldsValidated = false;
    inputTitle = postModal.find('div [className="modal-heard modal-post"] input')
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

  test('title must be valid', () => {
    inputTitle.instance().value = '1'.repeat(80)
    postModal.find('select').simulate('change');
    expect(areTheFieldsValidated).toEqual(true);
  })

  test('on save event to new Post', () => {
    inputTitle.instance().value = 'Udacity is the best place to learn technology.'
    postModal.find('select').simulate('change');
    expect(didTheSaveEvent).toBe(true);
    expect(areTheFieldsValidated).toBe(true);
  })

  test('on click back button', () => {
    postModal.find('div [className="modal-heard modal-post"] span').simulate('click')
    expect(isClikedBackButton).toBe(true);
  })
})

test('on save event to Edit Post', () => {
  let didTheSaveEvent = false;
  const postModal = mount(
    <PostModal
      post={postUdacity}
      categories={categories}
      onClickBackButton={e => { }}
      onSave={e => { didTheSaveEvent = true }}
    />);
  postModal.find('button [className="save-button udacity"]').simulate('click');
  expect(didTheSaveEvent).toBe(true);
})
