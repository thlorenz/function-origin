# @thlorenz/function-origin [![](https://github.com/thlorenz/function-origin/workflows/Node%20CI/badge.svg?branch=master)](https://github.com/thlorenz/function-origin/actions)

Get origin of a function in Node.js

_NOTE_:

This is a version that fixes the bound function problem and works with latest Node.js versions.

The original module seems to be no longer maintained, i.e. this [PR fixing bound function
issues](https://github.com/vkurchatkin/function-origin/pull/8) hasn't been merged for years.

## Installation

```
npm install @thlorenz/function-origin
```

## Usage

```js
const { functionOrigin } = require('@thlorenz/function-origin')
const origin = functionOrigin(someFn)
```

`origin` has the following properties:

 - `file` — source file name;
 - `line` — line number (0-based);
 - `column` — column number (0-based);
 - `inferredName`.

If a function's origin cannot be resolved (as is the case for native functions like
`Math.abs`), an empty origin is returned which looks as follows:

```js
const { EMPTY_ORIGIN_INFO } = require('./')

console.log(EMPTY_ORIGIN_INFO)
// => { line: -1, column: -1, inferredName: '' }
```

Note that in that case `typeof file === 'undefined'` which allows you to detect that case.

# License

MIT
