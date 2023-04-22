"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.object.assign.js");
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _errorChecker = require("./utils/errorChecker");
var _useResizeHook = _interopRequireDefault(require("./hooks/useResizeHook"));
var _galleryDefaults = _interopRequireDefault(require("./utils/galleryDefaults"));
var _galleryStyles = _interopRequireDefault(require("./utils/galleryStyles"));
var _useWindowDimensions = require("./hooks/useWindowDimensions");
var _variables = require("./utils/variables");
var _reducers = require("./utils/reducers");
var _useInterval = _interopRequireDefault(require("./hooks/useInterval"));
var _lightbox = require("./utils/lightbox");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const cc = console.log;
/*TODO
   Add pointer to gallery images
   Major Bug: When mobile users stretch the screen e.g. via reaching the end and continuing, all gallery images disappear.
 */
/* Features
    Possibly undesirable:
        Add portrait-landscape button, which will remove all non-landscape or non-portrait images from the gallery.
        Add zoom to full screen image.
 */
function NjGallery(props) {
  (0, _errorChecker.checkInputForErrors)(props);
  const galleryElemRef = (0, _react.useRef)(null);
  const [imageElems, setImageElems] = (0, _react.useState)(null);
  const [lightboxState, setLightboxState] = (0, _react.useState)(null);
  const [lightboxEverOpened, setLightboxEverOpened] = (0, _react.useState)(false);
  const [lightboxOptionsActive, lightboxOptionsActiveDispatch] = (0, _react.useReducer)(_reducers.lightboxOptionsActiveReducer,
  //@ts-ignore
  _variables.initialShowGalleryData);
  const [shuffleReset] = (0, _useInterval.default)(() => {
    (0, _lightbox.shuffleImages)(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActiveDispatch, _lightbox.getRandomWholeNumber);
  }, lightboxState !== null && lightboxOptionsActive.shuffle ? 3000 : null);
  const [autoplayReset] = (0, _useInterval.default)(() => {
    (0, _lightbox.autoplayImages)(lightboxImages, lightboxOptionsActiveDispatch, setLightboxState, lightboxState);
  }, lightboxState !== null && lightboxOptionsActive.autoplay ? 3000 : null);
  const galleryInputsWithDefaults = (0, _galleryDefaults.default)(props); // TODO Design script to add original URL if large-img URL is not provided.
  const {
    containerPadding,
    containerWidth
  } = Object.assign({}, galleryInputsWithDefaults);
  const galleryCSS = (0, _galleryStyles.default)(containerPadding, containerWidth);
  (0, _useResizeHook.default)(setImageElems, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened);
  (0, _lightbox.OnMount)(lightboxOptionsActiveDispatch);
  (0, _lightbox.OnPropsChange)(props, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened, setImageElems, lightboxOptionsActiveDispatch);
  (0, _lightbox.HideNavbarWhenLightboxOpen)(lightboxState);
  (0, _lightbox.LightboxCloseOnClickOutsideElem)(lightboxState, setLightboxState, lightboxOptionsActive, lightboxEverOpened, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset);
  const [windowHeight, windowWidth] = (0, _useWindowDimensions.useWindowDimensions)();
  const lightboxImages = [...galleryInputsWithDefaults.images];
  const lightboxDimensionsCSS = (0, _lightbox.calculateImageSpecsForLightbox)(lightboxState, lightboxImages, windowHeight, windowWidth);
  const lightboxMuiButtonTheme = (0, _lightbox.CreateMUITheme)(galleryInputsWithDefaults.lightboxMuiButtonTheme);
  (0, _lightbox.LightboxKeyPressHandler)(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActive, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset);
  const tooltipsElems = (0, _lightbox.createTooltipsElems)(lightboxState, lightboxImages, windowWidth);
  const fullscreenLightboxElems = (0, _lightbox.CreateFullscreenLightboxElems)(lightboxOptionsActive, lightboxOptionsActiveDispatch, lightboxState, lightboxImages, setLightboxState, imageElems, shuffleReset, autoplayReset, galleryInputsWithDefaults.lightboxFullscreenMuiCloseButtonTheme);
  const lightboxElems = (0, _lightbox.CreateLightbox)(lightboxOptionsActiveDispatch, setLightboxState, lightboxImages, lightboxDimensionsCSS, lightboxState, lightboxOptionsActive, tooltipsElems, fullscreenLightboxElems, imageElems, lightboxMuiButtonTheme, shuffleReset, autoplayReset);
  return (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [lightboxState !== null && lightboxElems, (0, _jsxRuntime.jsx)("div", Object.assign({
      className: "njGallery",
      style: galleryCSS,
      ref: galleryElemRef
    }, {
      children: imageElems
    }))]
  });
}
var _default = NjGallery;
exports.default = _default;