import { AttributeValue } from './attributevalue'
import * as reflect from './reflect'

export function encode(i: {}): AttributeValue {
  const v = reflect.valueOf(i)

  switch (v.kind()) {
    case reflect.Invalid:
      return encodeNull()
    case reflect.Object:
      return encodeStruct(v)
    case reflect.Array:
      return encodeArray((v as unknown) as reflect.Value<[]>)
    case reflect.Buffer:
    case reflect.Set:
      throw Error('Not implemented yet')
    case reflect.Map:
    case reflect.Stream:
      throw Error('Unsupported data')
    default:
      return encodeScalar(v)
  }
}

function encodeNull(): AttributeValue {
  return { NULL: true }
}

function encodeString(v: reflect.Value<string>): AttributeValue {
  return { S: String(v.value()) }
}

function encodeNumber(v: reflect.Value<number>): AttributeValue {
  return { N: String(v.value()) }
}

function encodeScalar<T>(v: reflect.Value<T>): AttributeValue {
  switch (v.kind()) {
    case reflect.Bool:
      return { BOOL: Boolean(v.value()) }
    case reflect.String:
      return encodeString((v as unknown) as reflect.Value<string>)
    default:
      return encodeNumber((v as unknown) as reflect.Value<number>)
  }
}

function encodeStruct(v: reflect.Value<object>): AttributeValue {
  return {
    M: Object.keys(v.value()).reduce((o, key) => ({ ...o, ...{ [key]: encode(v.value()[key]) } }), {}),
  }
}

function encodeArray<T>(v: reflect.Value<T[]>): AttributeValue {
  return {
    L: v.value().reduce((o: AttributeValue[], val) => [...o, encode(val)], []),
  }
}
