import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import QuestionModal from '../components/QuestionModal'

test('render without error', () => {
  ReactDOM.render(
    <QuestionModal
      message={"A question was render without error"}
      onYesAnswer={e => { }}
      onNoAnswer={e => { }}
    />, document.createElement('div'));
})


test('last Snapshot', () => {
  const questionModal = renderer.create(
    <QuestionModal
      message={"Question?"}
      onYesAnswer={e => { }}
      onNoAnswer={e => { }}
    />);
  let tree = questionModal.toJSON();
  expect(tree).toMatchSnapshot();
})