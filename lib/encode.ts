import { AttributeValue } from './attributevalue'
import * as encoder from './encoder'

export function marshal(i: {}): AttributeValue {
  return encoder.encode(i)
}
export function marshalMap(i: {}): { [key: string]: AttributeValue } {
  return encoder.encode(i).M
}
