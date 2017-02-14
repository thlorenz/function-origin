var binding = require('bindings')('function_origin')

const util = require('util')
const print = obj => process._rawDebug(util.inspect(obj, true, 15, true))

module.exports = function functionOrigin(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Argument is not a function')
  }

  const functionInfo = {}

  binding.GetFunctionInfo(fn, onfunctionInfo)

  // called synchronously
  function onfunctionInfo(file, line, column, inferredName) {
    print({ file, line, column, inferredName })
    functionInfo.file = file
    functionInfo.line = line
    functionInfo.column = column
    functionInfo.inferredName = inferredName
  }
  return functionInfo
}
