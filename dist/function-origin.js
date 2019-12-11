"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setOrigin = require('bindings')('function_origin');
function functionOrigin(fn) {
    if (typeof fn !== 'function')
        throw new TypeError('Argument is not a function');
    const info = {
        file: null,
        line: null,
        column: null,
        inferredName: null,
    };
    setOrigin(fn, info);
    return info;
}
exports.functionOrigin = functionOrigin;
//# sourceMappingURL=function-origin.js.map