const setOrigin = require('bindings')('function_origin')

export type OriginInfo = {
  file?: string
  line?: number
  column?: number
  inferredName?: string
}

export function isNativeV8Function(fn: Function) {
  return (
    !fn.name.startsWith('bound') &&
    /function [a-z0-9]*\(\) \{ \[native code] }/i.test(fn.toString())
  )
}

export function functionOrigin(fn: Function, safe: boolean = true): OriginInfo {
  if (typeof fn !== 'function')
    throw new TypeError('Argument is not a function')

  if (safe && isNativeV8Function(fn))
    throw new TypeError(
      'Argument is a native function whose origin cannot be determined'
    )

  const info = {}

  setOrigin(fn, info)
  return info
}
