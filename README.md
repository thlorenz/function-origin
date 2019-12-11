# @thlorenz/function-origin [![](https://github.com/thlorenz/function-origin/workflows/Node%20CI/badge.svg?branch=master)](https://github.com/thlorenz/function-origin/actions)

Get origin of a function in Node.js

_NOTE_:

This is a version that fixes the bound function problem and works with latest Node.js versions.

The original module seems to be no longer maintained, i.e. this [PR fixing bound function
issues](https://github.com/vkurchatkin/function-origin/pull/8) hasn't been merged for years.


_WARNING_:

Passing a bound native function, like `Math.abs.bind(this)` will segfault the process.

This maybe a bug in V8 but at this point no workaround is known.

## Installation

```
npm install @thlorenz/function-origin
```

## Usage

```js
const functionOrigin = require('@thlorenz/function-origin')
const origin = functionOrigin(someFn)
```

`origin` has the following properties:

 - `file` — source file name;
 - `line` — line number (0-based);
 - `column` — column number (0-based);
 - `inferredName`.

## Performance over Safety

By default function-origin checks that the passed function is not a native function like
`Math.abs` and throws an error if so.
Without that check trying to find a the origin of a native function results in a segmentation
fault and crashes the entire app. To diable the check adapt the above examnple to the below.

```js
const functionOrigin = require('@thlorenz/function-origin')
const origin = functionOrigin(someFn, false)
```

# License

MIT
