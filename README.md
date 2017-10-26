# function-origin

_NOTE_:

This is a version that fixes the bound function problem. Use it until the [corresponding
PR](https://github.com/vkurchatkin/function-origin/pull/8) is merged.

Get origin of a function in io.js and node.js

# Usage

```
npm install function-origin
```

and then:

```javascript
var FunctionOrigin = require('function-origin');
var origin = FunctionOrigin(someFn);
```
`origin` has the following properties:

 - `file` — source file name;
 - `line` — line number (0-based);
 - `column` — column number (0-based);
 - `inferredName`.

# License

MIT
