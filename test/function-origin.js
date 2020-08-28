'use strict'

const test = require('tape')
const path = require('path')
const {
  functionOrigin,
  EMPTY_ORIGIN_INFO,
} = require('../dist/function-origin.js')

const fixturesPath = path.join(__dirname, 'fixtures.js')
const fixtures = require('./fixtures.js')

const setOrigin = require('bindings')('function_origin').setOrigin

test('\nOrigin of fixtures.TestFn', function(t) {
  const info = functionOrigin(fixtures.TestFn)

  t.equal(info.file, fixturesPath, 'file')
  t.equal(info.line, 2, 'line')
  t.equal(info.column, 15, 'column')
  t.equal(fixtures.TestFn.name, 'TestFn', 'name')
  t.equal(info.inferredName, 'TestFn', 'inferredName')

  t.end()
})

test('\nOrigin of fixtures.assignedFn', function(t) {
  const info = functionOrigin(fixtures.assignedFn)

  t.equal(info.file, fixturesPath, 'file')
  t.equal(info.line, 5, 'line')
  t.equal(info.column, 26, 'colunm')
  t.equal(info.inferredName, 'assignedFn', 'inferredName')

  t.end()
})

test('\nOrigin of boundFunction', function(t) {
  const boundFunction = fixtures.TestFn.bind({})
  const info = functionOrigin(boundFunction)

  t.equal(info.file, fixturesPath, 'file')
  t.equal(info.line, 2, 'line')
  t.equal(info.column, 15, 'colunn')
  t.equal(info.inferredName, 'TestFn', 'inferredName')

  t.end()
})

// V8 regressed WRT info provided for native functions, at least for Node.js v6
// it provides `{ file: 'native math.js', line: 12, column: 16, inferredName:
// '' }` for `Math.abs`, while in later versions `file === undefined`.
const major = parseInt(process.versions.node.slice(0, 3))
if (major >= 8) {
  test('\nOrigin of native functions returns empty', function(t) {
    t.deepEqual(
      functionOrigin(Math.abs),
      Object.assign({}, EMPTY_ORIGIN_INFO, { inferredName: 'abs' }),
      'Math.abs'
    )
    t.deepEqual(
      functionOrigin(setOrigin),
      Object.assign({}, EMPTY_ORIGIN_INFO, { inferredName: 'setOrigin' }),
      'setOrigin'
    )
    t.deepEqual(
      functionOrigin(Math.abs.bind(this)),
      Object.assign({}, EMPTY_ORIGIN_INFO, { inferredName: 'abs' }),
      'Math.abs.bind(this)'
    )
    t.deepEqual(
      functionOrigin(Math.abs.bind(this, 1)),
      Object.assign({}, EMPTY_ORIGIN_INFO, { inferredName: 'abs' }),
      'Math.abs.bind(this, 1)'
    )

    t.end()
  })
}
