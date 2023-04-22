"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _isFunction = _interopRequireDefault(require("./shared/isFunction"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// From beautiful-react-hooks. Modified to include a reset feature.
const defaultOptions = {
  cancelOnUnmount: true
};
const useInterval = function useInterval(fn, milliseconds) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;
  const opts = Object.assign(Object.assign({}, defaultOptions), options || {});
  const timeout = (0, _react.useRef)();
  const callback = (0, _react.useRef)(fn);
  const [isCleared, setIsCleared] = (0, _react.useState)(false); // Can be returned, but I removed it.
  const [isReset, setReset] = (0, _react.useState)(false);
  const clear = (0, _react.useCallback)(() => {
    if (timeout.current) {
      setIsCleared(true);
      clearInterval(timeout.current);
    }
  }, []);
  (0, _react.useEffect)(() => {
    if ((0, _isFunction.default)(fn)) {
      callback.current = fn;
    }
  }, [fn]);
  (0, _react.useEffect)(() => {
    if (isReset) {
      clear();
      setReset(false);
    }
  }, [isReset]);
  (0, _react.useEffect)(() => {
    if (typeof milliseconds === 'number') {
      //@ts-ignore
      timeout.current = setInterval(() => {
        callback.current();
      }, milliseconds);
    }
    return clear;
  }, [milliseconds, isReset]);
  (0, _react.useEffect)(() => () => {
    if (opts.cancelOnUnmount) {
      clear();
    }
  }, []);
  return [setReset];
};
var _default = useInterval;
exports.default = _default;