const setOrigin = require('bindings')('function_origin')

export type OriginInfo = {
  file: string | null
  line: number | null
  column: number | null
  inferredName: string | null
}

export function functionOrigin(fn: Function): OriginInfo {
  if (typeof fn !== 'function')
    throw new TypeError('Argument is not a function')

  const info = {
    file: null,
    line: null,
    column: null,
    inferredName: null,
  }

  setOrigin(fn, info)
  return info
}
