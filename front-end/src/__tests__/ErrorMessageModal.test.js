import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import ErrorMessageModal from '../components/ErrorMessageModal'

test('render without error', () => {
  ReactDOM.render(
    <ErrorMessageModal
      message={"An error happened, please try again."}
    />, document.createElement('div'));
})

test('last Snapshot', () => {
  const waitProcessModal = renderer.create(
    <ErrorMessageModal
      message={"An error happened, please try again."}
    />);
  let tree = waitProcessModal.toJSON();
  expect(tree).toMatchSnapshot();
})