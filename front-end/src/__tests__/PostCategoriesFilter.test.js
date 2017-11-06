
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import PostCategoriesFilter from '../components/PostCategoriesFilter'

const categories = global.dataForTest.categories

test('render without error', () => {
  ReactDOM.render(<PostCategoriesFilter categories={categories} />, document.createElement('div'));
})

test('on selected a category', () => {
  const testOnSelectOneCategory = (category) => {
    const onSelectCategory = (e) => {
      const selectedCategory = e.target.value;
      expect(category).toEqual(selectedCategory);
    }
    const postCategoriesFilter = mount(
      <PostCategoriesFilter
        categories={categories}
        onSelected={onSelectCategory}
      />);
    const event = { target: { value: category } };
    postCategoriesFilter.find('select').simulate('change', event);
  };
  testOnSelectOneCategory("udacity");
  testOnSelectOneCategory("reactd");
  testOnSelectOneCategory("redux");
})

test('last Snapshot', () => {
  const postCategoriesFilter = renderer.create(
    <PostCategoriesFilter
      categories={categories}
      onSelected={e =>{}}
    />);
  let tree = postCategoriesFilter.toJSON();
  expect(tree).toMatchSnapshot();
})