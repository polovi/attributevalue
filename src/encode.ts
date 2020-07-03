import * as reflect from './reflect'
import { AttributeValue } from '@aws-sdk/client-dynamodb'

export function marshal(i: any): AttributeValue {
  return encode(i)
}

export function marshalMap(i: any): { [key: string]: AttributeValue } {
  return encode(i).M
}

export function marshalList(i: any): AttributeValue[] {
  return encode(i).L
}

export function encode(i: any): AttributeValue {
  const t = reflect.typeOf(i)

  switch (t.kind) {
    case reflect.Invalid:
      return { NULL: true }
    case reflect.String:
      return { S: String(i) }
    case reflect.Number:
      return { N: String(i) }
    case reflect.Bool:
      return { BOOL: Boolean(i) }
    case reflect.Array:
      return encodeArray(i)
    case reflect.Map:
      return encodeMap(i)
    case reflect.Object:
      return encodeStruct(i)
    case reflect.Set:
      return encodeSet(i, t)
    case reflect.Buffer:
    case reflect.Uint8Array:
      return encodeBinary(i)
    default:
      throw Error('invalid')
  }
}

function encodeMap(m: Map<any, any>): AttributeValue {
  const av = { M: {} }
  m.forEach((v, k) => (av.M[String(k)] = encode(v)))
  return av
}
function encodeStruct(o: object): AttributeValue {
  return {
    M: Object.keys(o).reduce(
      (out, key) => ({
        ...out,
        ...{ [String(key)]: encode(o[key]) },
      }),
      {}
    ),
  }
}

function encodeArray(a: Array<any>): AttributeValue {
  return { L: a.map(encode) }
}

function encodeSet(s: Set<any>, t: reflect.Type): AttributeValue {
  let av: AttributeValue

  switch (t.elem().kind) {
    case reflect.String:
      av = { SS: [] }
      s.forEach((v) => av.SS.push(String(v)))
      break
    case reflect.Number:
      av = { NS: [] }
      s.forEach((v) => av.NS.push(String(v)))
      break
    case reflect.Buffer:
    case reflect.Uint8Array:
      av = { BS: [] }
      s.forEach((v) => av.BS.push(v))
      break
    default:
      throw Error('invalid set type')
  }

  return av
}

function encodeBinary(b: Uint8Array): AttributeValue {
  return { B: b }
}
