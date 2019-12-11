"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setOrigin = require('bindings')('function_origin');
function isNativeV8Function(fn) {
    return (!fn.name.startsWith('bound') &&
        /function [a-z0-9]*\(\) { \[native code] }/i.test(fn.toString()));
}
exports.isNativeV8Function = isNativeV8Function;
function functionOrigin(fn, safe = true) {
    if (typeof fn !== 'function')
        throw new TypeError('Argument is not a function');
    if (safe && isNativeV8Function(fn))
        throw new TypeError('Argument is a native function whose origin cannot be determined');
    const info = {};
    setOrigin(fn, info);
    return info;
}
exports.functionOrigin = functionOrigin;
//# sourceMappingURL=function-origin.js.map