import * as reflect from './reflect'

test('Invalid', () => {
  expect(reflect.typeOf(null).kind).toEqual(reflect.Invalid)
  expect(reflect.typeOf(undefined).kind).toEqual(reflect.Invalid)
})
test('String', () => {
  expect(reflect.typeOf('abc').kind).toEqual(reflect.String)
  expect(reflect.typeOf('123').kind).toEqual(reflect.String)
})
test('number', () => {
  expect(reflect.typeOf(123).kind).toEqual(reflect.Number)
  expect(reflect.typeOf(123.254).kind).toEqual(reflect.Number)
})
test('boolean', () => {
  expect(reflect.typeOf(true).kind).toEqual(reflect.Bool)
  expect(reflect.typeOf(false).kind).toEqual(reflect.Bool)
})
test('array', () => {
  expect(reflect.typeOf(['abc', 123]).kind).toEqual(reflect.Array)
})
test('object', () => {
  class C {}

  expect(reflect.typeOf({ abc: 123, '123': 'abc' }).kind).toEqual(reflect.Object)
  expect(reflect.typeOf(new C()).kind).toEqual(reflect.Object)
})
test('map', () => {
  expect(reflect.typeOf(new Map([['abc', 123]])).kind).toEqual(reflect.Map)
  expect(reflect.typeOf(new Map([['abc', '123']])).kind).toEqual(reflect.Map)
})
test('set', () => {
  expect(reflect.typeOf(new Set([1, 2, 3])).kind).toEqual(reflect.Set)
})
test('set elem', () => {
  expect(reflect.typeOf(new Set([123, 345])).elem().kind).toEqual(reflect.Number)
  expect(reflect.typeOf(new Set(['abc', '123'])).elem().kind).toEqual(reflect.String)
  expect(reflect.typeOf(new Set(['abc', 123])).elem().kind).toEqual(reflect.Object)
  expect(reflect.typeOf(new Set([Buffer.from('abc'), Buffer.from('123')])).elem().kind).toEqual(reflect.Buffer)
  expect(reflect.typeOf(new Set([new Uint8Array([1, 2, 3]), new Uint8Array([3, 4, 5])])).elem().kind).toEqual(
    reflect.Uint8Array
  )
})
test('buffer', () => {
  expect(reflect.typeOf(Buffer.from('abc')).kind).toEqual(reflect.Buffer)
})
test('uint8array', () => {
  expect(reflect.typeOf(new Uint8Array([123])).kind).toEqual(reflect.Uint8Array)
})
