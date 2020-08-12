import { AttributeValue } from '@aws-sdk/client-dynamodb'

export interface Encoder {
  nullEmptyString?: boolean
  omitEmpty?: boolean
}

export const marshal = (i: any, e?: Encoder): AttributeValue => {
  return encode(i, {
    nullEmptyString: true,
    omitEmpty: false,
    ...e,
  })
}

export function marshalMap(i: any, e?: Encoder): { [key: string]: AttributeValue } {
  return marshal(i, e).M
}

export function marshalList(i: any, e?: Encoder): AttributeValue[] {
  return marshal(i, e).L
}

const encode = (i: any, e: Encoder): AttributeValue => {
  if (i === null || i === undefined) {
    return encodeNull()
  }

  switch (typeof i) {
    case 'object':
      return encodeObject(i, e)
    case 'string':
      return encodeString(i, e)
    case 'number':
      return { N: String(i) }
    case 'boolean':
      return { BOOL: i }
    default:
      throw new UnsupportedMarshalTypeError(`value type ${typeof i} is not supported`)
  }
}

const encodeNull = (): AttributeValue => ({
  NULL: true,
})

const encodeString = (s: any, e: Encoder): AttributeValue => {
  if (!s && e.nullEmptyString) {
    return encodeNull()
  }

  return { S: s }
}

const encodeObject = (i: any, e: Encoder): AttributeValue => {
  // switch (true) {
  //   case i instanceof Map:
  //     return encodeMap(i, e)
  //   case i instanceof Set:
  //     return encodeSet(i, e)
  //   case Array.isArray(i):
  //     return encodeList(i, e)
  //   default:
  //     return encodeStruct(i, e)
  // }

  if (i instanceof Map) {
    return encodeMap(i, e)
  } else if (i instanceof Set) {
    return encodeSet(i, e)
  } else if (Array.isArray(i)) {
    return encodeList(i, e)
  }
  return encodeStruct(i, e)
}

const encodeStruct = (o: any, e: Encoder): AttributeValue => {
  const av: AttributeValue = { M: {} }
  for (let name in o) {
    if (!name) {
      throw new InvalidMarshalError('struct key cannot be empty')
    }

    let elem: AttributeValue = encode(o[name], e)
    if (elem.NULL && e.omitEmpty) {
      continue
    }
    av.M[name] = elem
  }
  return av
}

const encodeMap = (m: Map<any, any>, e: Encoder): AttributeValue => {
  const av: AttributeValue = { M: {} }
  for (let [name, value] of m) {
    if (!name) {
      throw new InvalidMarshalError('map key cannot be empty')
    }

    let elem: AttributeValue = encode(value, e)
    if (elem.NULL && e.omitEmpty) {
      continue
    }
    av.M[name] = elem
  }
  return av
}

const encodeSet = (s: Set<any>, e: Encoder): AttributeValue => {
  if (!s.size) {
    throw new InvalidMarshalError('set must only contain non-null numbers or strings')
  }

  const t = typeof s[Symbol.iterator]().next().value
  const av: AttributeValue = {}

  let elemFn: (elem: AttributeValue) => void

  switch (t) {
    case 'number':
      av.NS = []
      elemFn = (elem) => {
        if (!elem.N) {
          throw new InvalidMarshalError('number set must only contain non-null numbers')
        }
        av.NS.push(elem.N)
      }
      break
    case 'string':
      av.SS = []
      elemFn = (elem) => {
        if (!elem.S) {
          throw new InvalidMarshalError('string set must only contain non-null strings')
        }
        av.SS.push(elem.S)
      }
      break
    default:
      throw new UnsupportedMarshalTypeError(`value type ${t} is not supported in set`)
  }

  encodeCollection(s, elemFn, e)

  return av
}

const encodeList = (a: any[], e: Encoder): AttributeValue => {
  const av: AttributeValue = { L: [] }
  encodeCollection(a, (elem) => av.L.push(elem), e)
  return av
}

const encodeCollection = (i: any[] | Set<any>, elemFn: (elem: AttributeValue) => void, e: Encoder) => {
  for (let item of i) {
    const elem = encode(item, { omitEmpty: e.omitEmpty })
    if (elem.NULL && e.omitEmpty) {
      continue
    }
    elemFn(elem)
  }
}

export class UnsupportedMarshalTypeError extends Error {
  name = 'UnsupportedMarshalTypeError'
}
export class InvalidMarshalError extends Error {
  name = 'InvalidMarshalError'
}
