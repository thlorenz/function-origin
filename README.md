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
var FunctionOrigin = require('@thlorenz/function-origin');
var origin = new FunctionOrigin(someFn);
```
`origin` has the following properties:

 - `file` — source file name;
 - `line` — line number (0-based);
 - `column` — column number (0-based);
 - `inferredName`.

# License

MIT
