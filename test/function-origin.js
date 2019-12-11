'use strict'

const test = require('tape')
const path = require('path')
const FunctionOrigin = require('../index.js')

const fixturesPath = path.join(__dirname, 'fixtures.js')
const fixtures = require('./fixtures.js')

test('\nOrigin of fixtures.TestFn', function (t) {
  const info = new FunctionOrigin(fixtures.TestFn)

  t.equal(info.file, fixturesPath, 'file')
  t.equal(info.line, 2, 'line')
  t.equal(info.column, 15, 'column')
  t.equal(fixtures.TestFn.name, 'TestFn', 'name')
  t.equal(info.inferredName, '', 'inferredName')

  t.end()
})

test('\nOrigin of fixtures.assignedFn', function (t) {
  const info = FunctionOrigin(fixtures.assignedFn)

  t.equal(info.file, fixturesPath, 'file')
  t.equal(info.line, 5, 'line')
  t.equal(info.column, 26, 'colunm')
  t.equal(info.inferredName, 'assignedFn', 'inferredName')

  t.end()
})

test('\nOrigin of boundFunction', function (t) {
  const boundFunction = fixtures.TestFn.bind({})
  const info = FunctionOrigin(boundFunction)

  t.equal(info.file, fixturesPath, 'file')
  t.equal(info.line, 2, 'line')
  t.equal(info.column, 15, 'colunn')
  t.equal(info.inferredName, '', 'inferredName')

  t.end()
})
