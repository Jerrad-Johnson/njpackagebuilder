"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowDimensions = useWindowDimensions;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
function useWindowDimensions() {
  const [windowHeight, setWindowHeight] = (0, _react.useState)(1080);
  const [windowWidth, setWindowWidth] = (0, _react.useState)(1920);
  (0, _react.useEffect)(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
      });
    };
  }, []);
  return [windowHeight, windowWidth];
}