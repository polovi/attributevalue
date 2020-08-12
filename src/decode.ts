import { AttributeValue } from '@aws-sdk/client-dynamodb'

export const unmarshal = <T>(av: AttributeValue): T => decode(av) as T

export const unmarshalMap = <T extends object>(m: { [key: string]: AttributeValue }): T => decode({ M: m }) as T

export const unmarshalList = <T extends any[]>(l: AttributeValue[]): T => decode({ L: l }) as T

export const unmarshalListOfMaps = <T extends any[]>(l: Array<{ [key: string]: AttributeValue }>): T => {
  return unmarshalList(
    l.map<AttributeValue>((m) => ({ M: m }))
  )
}

const decode = (av: AttributeValue): any => {
  if (!av || av.NULL !== undefined) {
    return null
  } else if (av.S !== undefined) {
    return av.S
  } else if (av.N !== undefined) {
    return Number(av.N)
  } else if (av.L !== undefined) {
    return av.L.map(decode)
  } else if (av.M !== undefined) {
    return decodeMap(av.M)
  } else if (av.BOOL !== undefined) {
    return av.BOOL
  } else if (av.SS !== undefined) {
    return new Set(av.SS)
  } else if (av.NS !== undefined) {
    return new Set(av.NS)
  }

  throw new UnmarshalTypeError('cannot unmarshal')
}

const decodeMap = (avMap: { [key: string]: AttributeValue } = {}) => {
  const o: any = {}
  for (const key in avMap) {
    o[key] = decode(avMap[key])
  }
  return o
}

export class UnmarshalTypeError extends Error {
  name = 'UnmarshalTypeError'
}
