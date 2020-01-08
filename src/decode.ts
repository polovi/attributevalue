import { AttributeValue } from './attributevalue'

export function unmarshal<T>(av: AttributeValue): T {
  return decode(av) as T
}

export function unmarshalMap<T extends object>(m: { [key: string]: AttributeValue }): T {
  return decode({ M: m }) as T
}

export function unmarshalList<T extends any[]>(l: AttributeValue[]): T {
  return decode({ L: l }) as T
}

export function decode(av: AttributeValue): any {
  if (!av || !!av.NULL) {
    return null
  }

  if ('BOOL' in av) {
    return av.BOOL
  } else if ('S' in av) {
    return av.S
  } else if ('N' in av) {
    return Number(av.N)
  } else if ('B' in av) {
    return av.B
  } else if ('L' in av) {
    return decodeList(av.L)
  } else if ('M' in av) {
    return decodeMap(av.M)
  } else if ('SS' in av) {
    return decodeStringSet(av.SS)
  } else if ('NS' in av) {
    return decodeNumberSet(av.NS)
  } else if ('BS' in av) {
    return decodeBinarySet(av.BS)
  }

  return null
}

function decodeList(avList: AttributeValue[]): any[] {
  if (!Array.isArray(avList) || !avList.length) {
    return []
  }
  return avList.reduce<any[]>((out, i) => [...out, decode(i)], [])
}

function decodeMap(avMap: { [key: string]: AttributeValue }): any {
  return Object.keys(avMap || {}).reduce<any>(
    (out, k) => ({
      ...out,
      ...{ [k]: decode(avMap[k]) },
    }),
    {}
  )
}

function decodeStringSet(ss: Array<string>): Set<string> {
  return new Set(ss)
}

function decodeNumberSet(ns: Array<string>): Set<number> {
  return new Set(ns.map(v => Number(v)))
}

function decodeBinarySet(ns: Array<ArrayBuffer | ArrayBufferView>): Set<ArrayBuffer | ArrayBufferView> {
  return new Set(ns)
}
