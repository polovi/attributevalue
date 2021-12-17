'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.unmarshalListOfMaps = exports.unmarshalList = exports.unmarshalMap = exports.unmarshal = void 0
const unmarshal = (av) => decode(av)
exports.unmarshal = unmarshal
const unmarshalMap = (m) => decode({ M: m })
exports.unmarshalMap = unmarshalMap
const unmarshalList = (l) => decode({ L: l })
exports.unmarshalList = unmarshalList
const unmarshalListOfMaps = (l) => (0, exports.unmarshalList)(l.map((m) => ({ M: m })))
exports.unmarshalListOfMaps = unmarshalListOfMaps
const decode = (av) => {
  if (!av || av.NULL !== undefined) {
    return null
  } else if (av.S !== undefined) {
    return av.S
  } else if (av.N !== undefined) {
    return decodeNumber(av.N)
  } else if (av.L !== undefined) {
    return av.L.map(decode)
  } else if (av.M !== undefined) {
    return decodeMap(av.M)
  } else if (av.BOOL !== undefined) {
    return av.BOOL
  } else if (av.SS !== undefined) {
    return new Set(av.SS)
  } else if (av.NS !== undefined) {
    return new Set(av.NS.map(decodeNumber))
  } else if (av.BS !== undefined) {
    return new Set(av.BS)
  } else if (av.B !== undefined) {
    return av.B
  }
  throw new Error(`unsupported AttributeValue type ${JSON.stringify(av)}`)
}
const decodeNumber = (n) => {
  const num = Number(n)
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    return BigInt(n)
  }
  return num
}
const decodeMap = (m = {}) => {
  const o = {}
  for (const key in m) {
    o[key] = decode(m[key])
  }
  return o
}
