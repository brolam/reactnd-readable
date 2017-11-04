import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import QuestionModal from '../components/QuestionModal'

test('render without error', () => {
  ReactDOM.render(
    <QuestionModal
      message={"A question was render without error"}
      onYesAnswer={e => { }}
      onNoAnswer={e => { }}
      timeout={3000}
    />, document.createElement('div'));
})

test('last Snapshot', () => {
  const questionModal = renderer.create(
    <QuestionModal
      message={"Question?"}
      onYesAnswer={e => { }}
      onNoAnswer={e => { }}
      timeout={3000}
    />);
  let tree = questionModal.toJSON();
  expect(tree).toMatchSnapshot();
})

test('when clicking anywhere and not on yes or no', () => {
  let isClikedNoAnswer = false;
  const questionModal = mount(
    <QuestionModal
      message={"Question?"}
      onYesAnswer={e => { }}
      onNoAnswer={e => { isClikedNoAnswer = true }}
      timeout={3000}
    />);
  questionModal.find('div [className="modal-short"]').simulate('click')
  expect(isClikedNoAnswer).toBe(true);
})

test('close automatic on default timeout', () => {
  jest.useFakeTimers();
  let isClikedNoAnswer = false;
  const questionModal = mount(
    <QuestionModal
      message={"Question?"}
      onYesAnswer={e => { }}
      onNoAnswer={e => { isClikedNoAnswer = true }}
      timeout={3000}
    />);
  setTimeout(() => {
    expect(isClikedNoAnswer).toBe(true);
  }, 5000);
  jest.runAllTimers();
})

test('on click yes answer', () => {
  let isClikedYesAnswer = false;
  const questionModal = mount(
    <QuestionModal
      message={"Question?"}
      onYesAnswer={e => { isClikedYesAnswer = true }}
      onNoAnswer={e => { }}
      timeout={3000}
    />);
  questionModal.find('a [className="yes"]').simulate('click')
  expect(isClikedYesAnswer).toBe(true);
})

test('on click no answer', () => {
  let isClikedNoAnswer = false;
  const questionModal = mount(
    <QuestionModal
      message={"Question?"}
      onYesAnswer={e => { }}
      onNoAnswer={e => { isClikedNoAnswer = true }}
      timeout={3000}
    />);
  questionModal.find('a [className="no"]').simulate('click')
  expect(isClikedNoAnswer).toBe(true);
})