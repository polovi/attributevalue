import { unmarshal, unmarshalMap, unmarshalList } from './decode'

test('unmarshal null', () => {
  expect(unmarshal({ NULL: true })).toEqual(null)
  expect(unmarshal(null)).toEqual(null)
  expect(unmarshal(undefined)).toEqual(null)
})
test('unmarshal boll', () => {
  expect(unmarshal({ BOOL: true })).toEqual(true)
  expect(unmarshal({ BOOL: false })).toEqual(false)
})
test('unmarshal string', () => {
  expect(unmarshal({ S: 'abc' })).toEqual('abc')
})
test('unmarshal number', () => {
  expect(unmarshal({ N: '123' })).toEqual(123)
  expect(unmarshal({ N: '123.456' })).toEqual(123.456)
})
test('unmarshal number', () => {
  const b = Buffer.from('abc')
  const u = new Uint8Array([123])
  expect(unmarshal({ B: b })).toEqual(b)
  expect(unmarshal({ B: u })).toEqual(u)
})
test('unmarshal map', () => {
  expect(unmarshalMap(null)).toEqual({})
  expect(unmarshalMap(undefined)).toEqual({})
  expect(
    unmarshalMap({
      abc: { N: '123' },
      123: { S: 'abc' },
    })
  ).toEqual({
    abc: 123,
    123: 'abc',
  })
})
test('unmarshal list', () => {
  expect(unmarshalList(null)).toEqual([])
  expect(unmarshalList(undefined)).toEqual([])
  expect(unmarshalList([{ S: 'abc' }, { N: '123' }])).toEqual(['abc', 123])
})
test('unmarshal set', () => {
  expect(unmarshal({ SS: ['abc', '123'] })).toEqual(new Set(['abc', '123']))
  expect(unmarshal({ NS: ['123', '456'] })).toEqual(new Set([123, 456]))
  expect(unmarshal({ BS: [new Uint8Array([123])] })).toEqual(new Set([new Uint8Array([123])]))
})
test('unmarshalMap', () => {
  expect(unmarshalMap({ abc: { N: '123' }, '123': { S: 'abc' } })).toEqual({ abc: 123, '123': 'abc' })
})

test('unmarshalList', () => {
  expect(unmarshalList([{ S: 'abc' }, { N: '123' }])).toEqual(['abc', 123])
})
