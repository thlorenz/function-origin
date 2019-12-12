"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setOrigin = require('bindings')('function_origin');
exports.EMPTY_ORIGIN_INFO = {
    line: -1,
    column: -1,
    inferredName: '',
};
function isUnboundNativeFunction(fn) {
    return (!fn.name.startsWith('bound') &&
        /function [a-z0-9]*\(\) { \[native code] }/i.test(fn.toString()));
}
exports.isUnboundNativeFunction = isUnboundNativeFunction;
function functionOrigin(fn) {
    if (typeof fn !== 'function')
        throw new TypeError('Argument is not a function');
    const info = {};
    setOrigin(fn, info);
    return info;
}
exports.functionOrigin = functionOrigin;
//# sourceMappingURL=function-origin.js.map