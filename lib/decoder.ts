import { AttributeValue } from './attributevalue'

export function decode<T>(av: AttributeValue): T {
  if ('M' in av) {
    return decodeMap(av.M)
  } else if ('L' in av) {
    return (decodeList(av.L) as unknown) as T
  } else if ('BOOL' in av) {
    return (decodeBool(av.BOOL) as unknown) as T
  } else if ('S' in av) {
    return (decodeString(av.S) as unknown) as T
  } else if ('N' in av) {
    return (decodeNumber(av.N) as unknown) as T
  } else if ('NULL' in av) {
    return null
  }

  throw Error('Unsupported attribute')
}

function decodeMap<T>(avMap: { [key: string]: AttributeValue }): T {
  return Object.keys(avMap).reduce(
    (out, k) => ({
      ...out,
      ...{ [k]: decode(avMap[k]) },
    }),
    {} as T
  )
}

function decodeList<T>(avList: AttributeValue[]): T[] {
  return avList.reduce<T[]>((out, i) => [...out, decode(i)], [])
}

function decodeBool(b: boolean): boolean {
  return Boolean(b)
}

function decodeString(s: string): string {
  return String(s)
}

function decodeNumber(n: string): number {
  return Number(n)
}
