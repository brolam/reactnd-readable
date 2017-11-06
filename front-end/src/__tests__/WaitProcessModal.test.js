import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import WaitProcessModal from '../components/WaitProcessModal'

test('render without error', () => {
  ReactDOM.render(
    <WaitProcessModal
      message={"Please wait while the information is updated."}
    />, document.createElement('div'));
})
