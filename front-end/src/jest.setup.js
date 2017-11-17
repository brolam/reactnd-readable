import "raf/polyfill";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

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
    timestamp: 1467166872630,
    author: "thingtwo",
    body: "Everyone says so after all.",
    deleted: false,
    voteScore: 5,
    comments: [
      {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "7ni6ok3ym7mf1p33lnez",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
      },
      {
        id: '8tu4bsun805n8un48ve89',
        parentId: "7ni6ok3ym7mf1p33lnez",
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
      }]
  },
  {
    category: "react",
    id: "8xf0y6ziyjabvozdd253nd",
    title: "Udacity is the best place to learn React",
    timestamp: 1467166872640,
    author: "thingtwo",
    body: "Everyone says so after all.",
    deleted: false,
    voteScore: 4,
    comments: []
  },
  {
    category: "redux",
    id: "7xf0y6ziyjabvozdd253nd",
    title: "Udacity is the best place to learn Redux",
    timestamp: 1467166872650,
    author: "thingtwo",
    body: "Everyone says so after all.",
    deleted: false,
    voteScore: 3,
    comments: []
  }]



}


