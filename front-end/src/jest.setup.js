import "raf/polyfill";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  token: "tokenToTest"
};

global.localStorage = localStorageMock;

global.dataForTest = {
  categories: [
    {
      name: 'udacity',
      path: 'udacity'
    },
    {
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    }
  ]
}
