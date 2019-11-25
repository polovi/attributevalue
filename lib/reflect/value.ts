import * as s from 'stream'

export const Invalid = 'undefined'
export const String = 'string'
export const Number = 'number'
export const Bool = 'boolean'
export const Map = 'map'
export const Set = 'set'
export const Object = 'object'
export const Function = 'function'
export const Array = 'array'
export const Buffer = 'buffer'
export const Stream = 'stream'

export interface Value<T> {
  value(): T | undefined
  kind(): string
  type(): string
  toString(): string
  isValid(): boolean
}

export function Value<T>(v: T | undefined = undefined, k: string = 'undefined'): Value<T> {
  return {
    value() {
      return v
    },
    kind() {
      if (v instanceof s.Stream) {
        return 'stream'
      }
      if (['uint8array', 'uint16array', 'uint32array', 'array', 'arraybuffer'].includes(k)) {
        return 'array'
      }
      return k
    },
    type() {
      return k
    },
    toString() {
      return this.value.constructor.toString()
    },
    isValid() {
      return !!this.value
    },
  }
}
