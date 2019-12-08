export type Kind = string

export const Invalid: Kind = 'invalid'
export const String: Kind = 'string'
export const Number: Kind = 'number'
export const Bool: Kind = 'boolean'
export const Object: Kind = 'object'
export const Array: Kind = 'array'
export const Set: Kind = 'set'
export const Map: Kind = 'map'
export const Buffer: Kind = 'buffer'
export const Uint8Array: Kind = 'uint8array'

export interface Type {
  kind: Kind
  elem(): Type
}

export function typeOf<T>(i: T): Type {
  return toType(i)
}

function toType<T>(i: T): Type {
  const t = tname(i)
  return {
    kind: t,
    elem() {
      if (t !== Set) {
        throw Error(`invalid type ${t}`)
      }
      return elemType((i as unknown) as Set<any>)
    },
  }
}

function tname<T>(i: T): string {
  if (i === null || i === undefined) {
    return Invalid
  }
  const match = i.constructor.toString().match(/^\s*function (.+)\(/)
  return match ? match[1].toString().toLowerCase() : typeof i
}

function elemType(s: Set<any>): Type {
  let rtype = null

  for (const v of s) {
    const t = typeOf(v)

    if (rtype !== null && rtype.kind !== t.kind) {
      rtype = typeOf({})
      break
    }

    rtype = t
  }
  return rtype
}
