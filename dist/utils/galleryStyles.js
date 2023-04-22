"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function createGalleryStyle(containerPadding, containerWidth) {
  return {
    "width": containerWidth,
    "display": "flex",
    "flexWrap": "wrap",
    "padding": containerPadding / 2 + "px " + containerPadding / 2 + "px " + containerPadding / 2 + "px " + containerPadding / 2 + "px"
  };
}
var _default = createGalleryStyle;
exports.default = _default;