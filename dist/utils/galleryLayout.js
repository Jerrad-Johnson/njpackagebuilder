"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _jsxRuntime = require("react/jsx-runtime");
var _image = _interopRequireDefault(require("next/image"));
var _lightbox = require("./lightbox");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const layoutGeometry = require('../justified-layout');
const cc = console.log;
function createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened) {
  let prevElements = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  const galleryInputsWithDefaultsCopy = Object.assign({}, galleryInputsWithDefaults);
  const {
    images,
    imagePadding
  } = galleryInputsWithDefaultsCopy;
  const galleryLayout = calculateGalleryLayout(galleryInputsWithDefaultsCopy, galleryElementRef);
  const reformattedGalleryLayout = reformatGalleryData(galleryLayout, images);
  const galleryElems = reformattedGalleryLayout.map(e => {
    const boxHeight = Math.trunc(+e.boxHeight);
    const boxWidth = Math.trunc(+e.boxWidth);
    const imgBlurSrc = e.imgBlurSrc ? "blur" : undefined;
    let ratio = +(e.boxHeight / e.boxWidth).toFixed(3);
    return (0, _jsxRuntime.jsx)("div", Object.assign({
      style: {
        "margin": imagePadding.vertical / 2 + "px " + imagePadding.horizontal / 2 + "px " + imagePadding.vertical / 2 + "px " + imagePadding.horizontal / 2 + "px"
      }
    }, {
      children: (0, _jsxRuntime.jsx)(_image.default, {
        src: e.imgSrc,
        onClick: event => {
          event.stopPropagation();
          (0, _lightbox.handleLightbox)(event, galleryInputsWithDefaults, setLightboxState, setLightboxEverOpened);
        },
        "data-ratio": ratio,
        "data-largeimg": e.lg_img_url,
        blurDataURL: e.imgBlurSrc,
        placeholder: imgBlurSrc,
        className: "njGalleryImage",
        width: boxWidth,
        height: boxHeight,
        alt: e.alt,
        style: {
          cursor: "pointer"
        }
      }, e.imgSrc)
    }), e.imgSrc);
  });
  if (galleryElems.length > 0) return galleryElems; // This hopefully solves cases when stretching the browser window, and doing other unknown actions, causes the gallery to permanently disappear.
  // @ts-ignore
  return prevElements;
}
function calculateGalleryLayout(galleryInputsWithDefaultsCopy, galleryElementRef) {
  var _a, _b;
  const {
    images,
    containerPadding,
    targetRowHeight,
    imagePadding,
    maxRows,
    showIncompleteRows,
    targetRowHeightTolerance
  } = galleryInputsWithDefaultsCopy;
  const imagesDimensions = images.map(e => {
    return {
      width: e.width,
      height: e.height
    };
  });
  let galleryContainerWidth = ((_a = galleryElementRef === null || galleryElementRef === void 0 ? void 0 : galleryElementRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) ? ((_b = galleryElementRef === null || galleryElementRef === void 0 ? void 0 : galleryElementRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth) - 4 : 14; // -4 because otherwise at some widths, the last image in a row jumps to the next row. Total width might be e.g. 0.42 pixels too large.
  if (galleryContainerWidth - containerPadding < 14) galleryContainerWidth = 14 + containerPadding;
  const galleryContainerCalculatedWidth = Math.trunc(galleryContainerWidth);
  return layoutGeometry(imagesDimensions, {
    containerWidth: galleryContainerCalculatedWidth,
    targetRowHeight: targetRowHeight || 300,
    containerPadding: containerPadding,
    boxSpacing: imagePadding,
    maxNumRows: maxRows,
    showWidows: showIncompleteRows,
    targetRowHeightTolerance: targetRowHeightTolerance,
    edgeCaseMinRowHeight: 80
  });
}
function reformatGalleryData(galleryLayout, images) {
  const imagesCopy = [...images];
  let reformattedGalleryLayout = [];
  for (let i = 0; i < galleryLayout.boxes.length; i++) {
    //@ts-ignore
    reformattedGalleryLayout[i] = {}; //@ts-ignore
    reformattedGalleryLayout[i].boxHeight = galleryLayout.boxes[i].height; //@ts-ignore
    reformattedGalleryLayout[i].boxWidth = galleryLayout.boxes[i].width; //@ts-ignore
    reformattedGalleryLayout[i].imgSrc = imagesCopy[i].src; //@ts-ignore
    reformattedGalleryLayout[i].imgBlurSrc = imagesCopy[i].blurSrc; //@ts-ignore
    reformattedGalleryLayout[i].alt = imagesCopy[i].alt; //@ts-ignore//@ts-ignore
    reformattedGalleryLayout[i].lg_img_url = imagesCopy[i].lg_img_url;
  }
  return reformattedGalleryLayout;
}
var _default = createGalleryLayout;
exports.default = _default;