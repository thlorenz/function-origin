const setOrigin = require('bindings')('function_origin')

export type OriginInfo = {
  file?: string
  line?: number
  column?: number
  inferredName?: string
}

export function functionOrigin(fn: Function): OriginInfo {
  if (typeof fn !== 'function')
    throw new TypeError('Argument is not a function')

  const info = {}

  setOrigin(fn, info)
  return info
}
