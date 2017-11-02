
import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import PostCategoriesFilter from '../components/PostCategoriesFilter'


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
    const event = {target: {value: category}}; 
    postCategoriesFilter.find('select').simulate('change', event);
  };
  testOnSelectOneCategory("udacity");
  testOnSelectOneCategory("reactd");
  testOnSelectOneCategory("redux");
})

const categories = ['udacity', 'react', 'redux']