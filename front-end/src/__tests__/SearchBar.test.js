import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import SearchBar from '../components/SearchBar'

test('render without error', () => {
  ReactDOM.render(<SearchBar placeholder="Search by title post" />, document.createElement('div'));
})

test('last Snapshot', () => {
  const searchBar = renderer.create(
    <SearchBar
      placeholder="Search by title post"
    />
  );
  let tree = searchBar.toJSON();
  expect(tree).toMatchSnapshot();
})

test('debounce input onSearch', () => {
  jest.useFakeTimers();
  let searchValue = undefined;
  const onSearch = (value) => {
    searchValue = value
  }
  const searchBar = mount(
    <SearchBar
      placeholder="Search by title post"
      onSearch={onSearch}
    />
  );
  const searchBarInput = searchBar.find('input')
  const event = { target: { value: 'udacity' } };
  searchBarInput.simulate('change', event);
  expect(searchValue).toBe(undefined)
  setTimeout(() => {
    expect(searchValue).toBe('udacity')
  }, 3000);
  jest.runAllTimers();
})

