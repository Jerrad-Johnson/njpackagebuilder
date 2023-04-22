"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _galleryLayout = _interopRequireDefault(require("../utils/galleryLayout"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened) {
  const listener = () => {
    setImageElements((0, _galleryLayout.default)(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened));
  };
  (0, _react.useEffect)(() => {
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
}
var _default = useResizeHook;
exports.default = _default;