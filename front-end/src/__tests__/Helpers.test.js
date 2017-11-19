import {capitalize} from '../components/utils/Helpers'

test('capitalize', () => {
  expect(capitalize('breno')).toEqual('Breno')
})

test('capitalize not string', () => {
  expect(capitalize(123)).toEqual('')
})

test('capitalize default param', () => {
  expect(capitalize()).toEqual('')
})