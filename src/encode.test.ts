import { marshal, marshalMap, marshalList } from './encode'

test('marshal null', () => {
  expect(marshal(null)).toEqual({ NULL: true })
  expect(marshal(undefined)).toEqual({ NULL: true })
})
test('marshal string', () => {
  expect(marshal('abc')).toEqual({ S: 'abc' })
  expect(marshal('123')).toEqual({ S: '123' })
})
test('marshal number', () => {
  expect(marshal(123)).toEqual({ N: '123' })
  expect(marshal(123.456)).toEqual({ N: '123.456' })
})
test('marshal boolean', () => {
  expect(marshal(true)).toEqual({ BOOL: true })
  expect(marshal(false)).toEqual({ BOOL: false })
})
test('marshal binary', () => {
  const b = Buffer.from('abc')
  const u = new Uint8Array([123])
  expect(marshal(b)).toEqual({ B: b })
  expect(marshal(u)).toEqual({ B: u })
})
test('marshal map', () => {
  expect(
    marshal(
      new Map([
        ['abc', '123'],
        ['123', 'abc'],
      ])
    )
  ).toEqual({
    M: {
      abc: { S: '123' },
      123: { S: 'abc' },
    },
  })
  expect(
    marshal(
      new Map([
        [123, 123],
        [345, 345],
      ])
    )
  ).toEqual({
    M: {
      '123': { N: '123' },
      '345': { N: '345' },
    },
  })
})
test('marshal object', () => {
  expect(marshal({ abc: 123, '123': 'abc' })).toEqual({
    M: {
      abc: { N: '123' },
      123: { S: 'abc' },
    },
  })

  class C {
    public abc: number = 123
    public 123: string = 'abc'
  }
  expect(marshal(new C())).toEqual({
    M: {
      abc: { N: '123' },
      123: { S: 'abc' },
    },
  })
})
test('marshal array', () => {
  expect(marshal(['abc', 123])).toEqual({
    L: [{ S: 'abc' }, { N: '123' }],
  })
})
test('marshal set', () => {
  expect(marshal(new Set(['abc', '123']))).toEqual({
    SS: ['abc', '123'],
  })
  expect(marshal(new Set([123, 456]))).toEqual({
    NS: ['123', '456'],
  })
  expect(() => marshal(new Set(['abc', 123]))).toThrowError()
})

test('marshalMap', () => {
  expect(marshalMap({ abc: 123, '123': 'abc' })).toEqual({ abc: { N: '123' }, '123': { S: 'abc' } })
})

test('marshalList', () => {
  expect(marshalList(['abc', 123])).toEqual([{ S: 'abc' }, { N: '123' }])
})
