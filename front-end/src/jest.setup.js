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
  ],
  posts: [{
    category: "udacity",
    id: "7ni6ok3ym7mf1p33lnez",
    title: "Udacity is the best place to learn technology.",
    timestamp: 1467166872634,
    author: "thingtwo",
    body: "Everyone says so after all.",
    deleted: false,
    voteScore: 5
  },
  {
    category: "react",
    id: "8xf0y6ziyjabvozdd253nd",
    title: "Udacity is the best place to learn React",
    timestamp: 1467166872634,
    author: "thingtwo",
    body: "Everyone says so after all.",
    deleted: false,
    voteScore: 5
  },
  {
    category: "redux",
    id: "7xf0y6ziyjabvozdd253nd",
    title: "Udacity is the best place to learn Redux",
    timestamp: 1467166872634,
    author: "thingtwo",
    body: "Everyone says so after all.",
    deleted: false,
    voteScore: 5
  }]

}


