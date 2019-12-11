'use strict'

const test = require('tape')
const path = require('path')
const { functionOrigin } = require('../dist/function-origin.js')

const fixturesPath = path.join(__dirname, 'fixtures.js')
const fixtures = require('./fixtures.js')

const setOrigin = require('bindings')('function_origin')

test('\nOrigin of fixtures.TestFn', function(t) {
  const info = functionOrigin(fixtures.TestFn)

  t.equal(info.file, fixturesPath, 'file')
  t.equal(info.line, 2, 'line')
  t.equal(info.column, 15, 'column')
  t.equal(fixtures.TestFn.name, 'TestFn', 'name')
  t.equal(info.inferredName, '', 'inferredName')

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
  t.equal(info.inferredName, '', 'inferredName')

  t.end()
})

test('\nOrigin of native functions', function(t) {
  t.throws(() => functionOrigin(Math.abs), /is a native function/, 'Math.abs')
  t.throws(
    () => functionOrigin(setOrigin),
    /is a native function/,
    'setOrigin binding'
  )

  t.end()
})
