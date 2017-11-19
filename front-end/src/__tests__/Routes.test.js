import {isPostPageUrl} from '../routes'

test('it is not a post url', () => {
  expect(isPostPageUrl('/posts/new')).toBe(false)
})

test('it is a post url', () => {
  expect(isPostPageUrl('/posts/12345/get/')).toBe(true)
})