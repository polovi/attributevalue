import { AttributeValue } from '@aws-sdk/client-dynamodb'

export const unmarshal = (av: AttributeValue): any => decode(av)

export const unmarshalMap = (m: { [key: string]: AttributeValue }): any => decode({ M: m })

export const unmarshalList = (l: AttributeValue[]): any => decode({ L: l })

export const unmarshalListOfMaps = (l: Array<{ [key: string]: AttributeValue }>): any =>
  unmarshalList(l.map((m) => ({ M: m })))

const decode = (av: any): any => {
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

const decodeNumber = (n: string): number | bigint => {
  const num = Number(n)

  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    return BigInt(n)
  }

  return num
}

const decodeMap = (m: { [key: string]: AttributeValue } = {}) => {
  const o: any = {}
  for (const key in m) {
    o[key] = decode(m[key])
  }
  return o
}
