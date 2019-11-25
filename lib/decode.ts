import { AttributeValue } from './attributevalue'
import * as decoder from './decoder'

export function unmarshal<T>(av: AttributeValue): T {
  return decoder.decode(av)
}

export function unmarshalMap<T>(m: { [key: string]: AttributeValue }): T {
  return decoder.decode({ M: m })
}
