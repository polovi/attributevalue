import { Value } from './value'

export function valueOf<T>(i: T): Value<T> {
  if (!i) {
    return Value()
  }

  return inspect(i)
}

function cname(type: any): string {
  var str = type.toString()
  var match = str.match(/^\s*function (.+)\(/)
  return String(match ? match[1] : undefined).toLowerCase()
}

function inspect<T>(i: T): Value<T> {
  const t = typeof i

  switch (t) {
    case 'string':
    case 'number':
      return Value(i, t)
    default:
      return inspectObject(i)
  }
}

function inspectObject<T extends {}>(i: T): Value<T> {
  const cn = cname(i.constructor)
  return Value(i, cn)
}
