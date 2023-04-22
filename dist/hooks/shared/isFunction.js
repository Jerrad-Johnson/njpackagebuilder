"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// From beautiful-react-hooks.
const isFunction = functionToCheck => typeof functionToCheck === 'function' && !!functionToCheck.constructor && !!functionToCheck.call && !!functionToCheck.apply;
var _default = isFunction;
exports.default = _default;