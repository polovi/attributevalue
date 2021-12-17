'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.marshalList = exports.marshalMap = exports.marshal = void 0
const marshal = (i, e) =>
  encode(i, {
    NullEmptySets: false,
    ...e,
  })
exports.marshal = marshal
const marshalMap = (i, e) => (0, exports.marshal)(i, e)?.M
exports.marshalMap = marshalMap
const marshalList = (i, e) => (0, exports.marshal)(i, e).L
exports.marshalList = marshalList
const encode = (i, e) => {
  if (i === null || i === undefined || i === NaN) {
    return encodeNull()
  }
  const type = typeof i
  switch (type) {
    case 'string':
      return { S: i }
    case 'number':
    case 'bigint':
      return { N: i.toString() }
    case 'boolean':
      return { BOOL: i.valueOf() }
    default:
      return encodeObject(i, e)
  }
}
const encodeNull = () => ({ NULL: true })
const encodeObject = (o, e) => {
  switch (o.constructor) {
    case Array:
      return encodeList(o, e)
    case Object:
      return encodeStruct(o, e)
    case Map:
      return encodeMap(o, e)
    case Set:
      return encodeSet(o, e)
    case Uint8Array:
      return { B: o }
    default:
      throw new Error(`Unsupported type ${o.constructor.name}`)
  }
}
const encodeList = (l, e) => ({
  L: l.map((item) => encode(item, e)),
})
const encodeStruct = (o, e) => {
  const av = { M: {} }
  for (let name in o) {
    if (!name) {
      throw new Error("map key can't be empty")
    }
    av.M[name.toString()] = encode(o[name], e)
  }
  return av
}
const encodeMap = (m, e) => {
  const av = { M: {} }
  for (let [name, value] of m) {
    if (!name) {
      throw new Error("map key can't be empty")
    }
    av.M[name.toString()] = encode(value, e)
  }
  return av
}
const encodeSet = (s, e) => {
  if (s.size === 0) {
    if (e.NullEmptySets) {
      return encodeNull()
    }
    throw new Error('set must only contain non-null elements')
  }
  const val = s.values().next().value
  const t = typeof val
  switch (t) {
    case 'number':
    case 'bigint':
      return {
        NS: Array.from(s).map((elem) => {
          const elemt = typeof elem
          if (elemt !== 'number' && elemt !== 'bigint') {
            throw new Error('number set must only contain non-null numbers')
          }
          return elem.toString()
        }),
      }
    case 'string':
      return {
        SS: Array.from(s).map((elem) => {
          if (typeof elem !== 'string') {
            throw new Error('string set must only contain non-null strings')
          }
          return elem
        }),
      }
    default:
      if (val.constructor === Uint8Array) {
        return {
          BS: Array.from(s).map((elem) => {
            if (elem?.constructor !== Uint8Array) {
              throw new Error('binary set must only contain non-null binary data')
            }
            return elem
          }),
        }
      }
      throw new Error(`value type ${t} is not supported in set`)
  }
}
