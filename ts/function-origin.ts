const setOrigin = require('bindings')('function_origin')

export const EMPTY_ORIGIN_INFO: OriginInfo = {
  line: -1,
  column: -1,
  inferredName: '',
}

export type OriginInfo = {
  file?: string
  line?: number
  column?: number
  inferredName?: string
}

export function isUnboundNativeFunction(fn: Function) {
  return (
    !fn.name.startsWith('bound') &&
    /function [a-z0-9]*\(\) { \[native code] }/i.test(fn.toString())
  )
}

export function functionOrigin(fn: Function): OriginInfo {
  if (typeof fn !== 'function')
    throw new TypeError('Argument is not a function')

  const info = {}

  setOrigin(fn, info)
  return info
}
