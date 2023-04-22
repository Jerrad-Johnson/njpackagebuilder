"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFullscreenLightboxElems = CreateFullscreenLightboxElems;
exports.CreateLightbox = CreateLightbox;
exports.CreateMUITheme = CreateMUITheme;
exports.HideNavbarWhenLightboxOpen = HideNavbarWhenLightboxOpen;
exports.LightboxCloseOnClickOutsideElem = LightboxCloseOnClickOutsideElem;
exports.LightboxKeyPressHandler = LightboxKeyPressHandler;
exports.OnMount = OnMount;
exports.OnPropsChange = OnPropsChange;
exports.autoplayImages = void 0;
exports.calculateImageSpecsForLightbox = calculateImageSpecsForLightbox;
exports.createTooltipsElems = createTooltipsElems;
exports.getRandomWholeNumber = getRandomWholeNumber;
exports.handleLightbox = handleLightbox;
exports.handleLightboxButtons = handleLightboxButtons;
exports.shuffleImages = void 0;
require("core-js/modules/es.object.assign.js");
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _variables = require("./variables");
var _galleryLayout = _interopRequireDefault(require("./galleryLayout"));
var _eventListener = _interopRequireDefault(require("@use-it/event-listener"));
var _material = require("@mui/material");
var _image = _interopRequireDefault(require("next/image"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _PlayCircle = _interopRequireDefault(require("@mui/icons-material/PlayCircle"));
var _Shuffle = _interopRequireDefault(require("@mui/icons-material/Shuffle"));
var _Fullscreen = _interopRequireDefault(require("@mui/icons-material/Fullscreen"));
var _Curtains = _interopRequireDefault(require("@mui/icons-material/Curtains"));
var _Info = _interopRequireDefault(require("@mui/icons-material/Info"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const cc = console.log;
function handleLightbox(event, galleryInputsWithDefaults, setLightboxState, setLightboxEverOpened) {
  const eventTarget = event.target;
  const url = eventTarget.getAttribute("data-largeimg");
  const position = galleryInputsWithDefaults.images.findIndex(elem => {
    return elem.lg_img_url === url;
  });
  setLightboxState(position);
  setLightboxEverOpened(true);
}
function handleLightboxButtons(lightboxDataDispatch) {
  lightboxDataDispatch({
    type: _variables.lightboxReducerCases.tooltip
  });
}
function LightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxOptionsActive, lightboxEverOpened, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset) {
  const listener = e => {
    if (lightboxState !== null) {
      const elem = document.getElementById("lightboxArea");
      const target = e.target;
      if (!(elem === null || elem === void 0 ? void 0 : elem.contains(target)) && lightboxOptionsActive.fullscreen !== true) {
        setLightboxState(null);
        resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
        lightboxOptionsActiveDispatch({
          type: _variables.lightboxReducerCases.fullscreenDisable
        });
      }
    }
  };
  (0, _react.useEffect)(() => {
    if (lightboxEverOpened) window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [lightboxEverOpened]);
}
function calculateImageSpecsForLightbox(lightboxState, lightboxImages, windowHeight, windowWidth) {
  var _a, _b;
  let activeImageWidth = 0;
  if (lightboxState !== null) activeImageWidth = (_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.width;
  let activeImageHeight = 0;
  if (lightboxState !== null) activeImageHeight = (_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.height;
  let ratio = activeImageHeight / activeImageWidth <= 1 ? activeImageHeight / activeImageWidth : activeImageWidth / activeImageHeight;
  let imageIsPortraitOrientation = activeImageWidth < activeImageHeight;
  let unitsToTopOfLightbox = 0;
  let unitsToSideOfLightbox = 0;
  if (imageIsPortraitOrientation) {
    unitsToTopOfLightbox = windowHeight / 80;
    unitsToSideOfLightbox = windowWidth / (80 * ratio);
  } else {
    unitsToTopOfLightbox = windowHeight / (80 * ratio);
    unitsToSideOfLightbox = windowWidth / 80;
  }
  let lightboxDimensionsStyle;
  if (unitsToTopOfLightbox < unitsToSideOfLightbox && !imageIsPortraitOrientation) {
    lightboxDimensionsStyle = {
      height: "".concat(windowHeight * .8, "px"),
      width: "".concat(windowHeight * (.8 * (1 / ratio)), "px")
    };
  } else if (unitsToTopOfLightbox < unitsToSideOfLightbox && imageIsPortraitOrientation) {
    lightboxDimensionsStyle = {
      height: "".concat(windowHeight * .8, "px"),
      width: "".concat(windowHeight * (.8 * ratio), "px")
    };
  } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && !imageIsPortraitOrientation) {
    lightboxDimensionsStyle = {
      height: "".concat(windowWidth * (.8 * ratio), "px"),
      width: "".concat(windowWidth * .8, "px")
    };
  } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && imageIsPortraitOrientation) {
    lightboxDimensionsStyle = {
      height: "".concat(windowWidth * (.8 * (1 / ratio)), "px"),
      width: "".concat(windowWidth * .8, "px")
    };
  }
  return lightboxDimensionsStyle;
}
function HideNavbarWhenLightboxOpen(lightboxState) {
  (0, _react.useEffect)(() => {
    if (lightboxState === null) {
      const navbarElem = document.querySelector(".navbar");
      if (navbarElem !== null) navbarElem.style.zIndex = "10";
    } else {
      const navbarElem = document.querySelector(".navbar");
      if (navbarElem !== null) navbarElem.style.zIndex = "1";
    }
  }, [lightboxState]);
}
function OnMount(lightboxOptionsActiveDispatch) {
  (0, _react.useEffect)(() => {
    lightboxOptionsActiveDispatch({
      type: _variables.lightboxInitialValueCase
    });
  }, []);
}
function OnPropsChange(props, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened, setImageElements, lightboxOptionsActiveDispatch) {
  (0, _react.useEffect)(() => {
    setImageElements(prevElements => (0, _galleryLayout.default)(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened, prevElements));
  }, [props]);
}
function createTooltipsElems(lightboxState, lightboxImages, windowWidth) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
  return (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [windowWidth > 800 && (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [((_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.tooltip_left) && (0, _jsxRuntime.jsx)("div", Object.assign({
        className: "lightbox__tooltip--left"
      }, {
        children: (0, _jsxRuntime.jsx)("div", Object.assign({
          className: "lightbox__tooltip--left-container"
        }, {
          children: (_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.tooltip_left
        }))
      })), ((_c = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _c === void 0 ? void 0 : _c.tooltip_right) && (0, _jsxRuntime.jsx)("div", Object.assign({
        className: "lightbox__tooltip--right"
      }, {
        children: (0, _jsxRuntime.jsx)("div", Object.assign({
          className: "lightbox__tooltip--right-container"
        }, {
          children: (_d = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _d === void 0 ? void 0 : _d.tooltip_right
        }))
      }))]
    }), windowWidth <= 800 && (((_e = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _e === void 0 ? void 0 : _e.tooltip_left) || ((_f = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _f === void 0 ? void 0 : _f.tooltip_left)) && (0, _jsxRuntime.jsx)("div", Object.assign({
      className: "lightbox__tooltip--combined"
    }, {
      children: (0, _jsxRuntime.jsxs)("div", Object.assign({
        className: "lightbox__tooltip--combined-container"
      }, {
        children: [((_g = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _g === void 0 ? void 0 : _g.tooltip_left) && ((_h = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _h === void 0 ? void 0 : _h.tooltip_left), ((_j = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _j === void 0 ? void 0 : _j.tooltip_right) && ((_k = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _k === void 0 ? void 0 : _k.tooltip_right)]
      }))
    }))]
  });
}
function LightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActive, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset) {
  const listener = e => {
    if (lightboxState !== null) {
      //27 == escape key, 39 == right arrow, 37 == left arrow.
      if (e.keyCode === 39 && lightboxState < (lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages.length) - 1 && lightboxState !== null) {
        setLightboxState(prev => {
          return prev !== null ? prev + 1 : prev;
        });
        resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
        return;
      }
      if (e.keyCode === 37 && lightboxState > 0 && lightboxState !== null) {
        setLightboxState(prev => {
          return prev !== null ? prev - 1 : prev;
        });
        resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
        return;
      }
      if (e.keyCode === 27 && lightboxState !== null && lightboxOptionsActive.fullscreen) {
        lightboxOptionsActiveDispatch({
          type: _variables.lightboxReducerCases.fullscreen
        });
        resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
        return;
      }
      if (e.keyCode === 27 && lightboxState !== null && !lightboxOptionsActive.fullscreen) {
        setLightboxState(null);
        resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
        return;
      }
    }
  };
  (0, _eventListener.default)("keydown", listener);
}
const autoplayImages = (lightboxImages, lightboxOptionsActiveDispatch, setLightboxState, lightboxState) => {
  if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({
    type: _variables.lightboxReducerCases.autoplayDisable
  });
  const currentPosition = lightboxState;
  const end = lightboxImages.length - 1,
    beginning = 0;
  currentPosition === end ? setLightboxState(0) : setLightboxState(prev => {
    if (prev !== null) return prev + 1;
    return prev;
  });
};
//@ts-ignore
exports.autoplayImages = autoplayImages;
const shuffleImages = (lightboxImages, lightboxState, setLightboxState, lightboxOptionsActiveDispatch, getRandomWholeNumber) => {
  if (lightboxImages.length === 1) return 0;
  const currentPosition = lightboxState; //@ts-ignore
  setLightboxState(getRandomWholeNumber(lightboxImages.length, currentPosition, lightboxImages));
};
exports.shuffleImages = shuffleImages;
function getRandomWholeNumber(num) {
  let currentNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let lightboxImages = arguments.length > 2 ? arguments[2] : undefined;
  if (lightboxImages.length === 1) return 0;
  const random = Math.floor(Math.random() * num);
  if (random === currentNum) return getRandomWholeNumber(num, currentNum, lightboxImages);
  return random;
}
function CreateMUITheme(muiLightboxButtonTheme) {
  return (0, _material.createTheme)(muiLightboxButtonTheme);
}
function CreateFullscreenLightboxElems(lightboxOptionsActive, lightboxOptionsActiveDispatch, lightboxState, lightboxImages, setLightboxState, imageElements, shuffleReset, autoplayReset, lightboxFullscreenMuiCloseButtonTheme) {
  var _a, _b, _c;
  const muiTheme = (0, _material.createTheme)(lightboxFullscreenMuiCloseButtonTheme);
  return (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: (0, _jsxRuntime.jsx)("div", Object.assign({
      className: "lightbox__fullscreen" + (lightboxOptionsActive.fullscreen === true ? " active" : ""),
      onClick: e => e.stopPropagation()
    }, {
      children: (0, _jsxRuntime.jsxs)("div", Object.assign({
        className: "lightbox__fullscreen--image-container" + (lightboxOptionsActive.fullscreen === true ? " active" : ""),
        onClick: e => {
          if (lightboxOptionsActive.fullscreen === false) return;
        }
      }, {
        children: [(0, _jsxRuntime.jsx)("div", Object.assign({
          className: "lightbox__loading-indicator"
        }, {
          children: (0, _jsxRuntime.jsx)(_material.CircularProgress, {})
        })), (0, _jsxRuntime.jsx)(_image.default, {
          src: lightboxState !== null && ((_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.lg_img_url) || "",
          className: "lightbox__image",
          layout: "fill",
          style: {
            objectFit: "contain"
          },
          alt: lightboxState !== null && ((_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.alt) || ""
        }, lightboxState !== null && ((_c = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _c === void 0 ? void 0 : _c.lg_img_url) || ""), (0, _jsxRuntime.jsx)("div", {
          className: "lightbox__fullscreen-image--move-left",
          style: checkSubsequentImageExists(lightboxImages.length, lightboxState, -1) ? {
            cursor: "pointer"
          } : {},
          onClick: e => {
            setLightboxState(prev => prev !== null && prev - 1 > -1 ? prev - 1 : prev);
            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
          }
        }), (0, _jsxRuntime.jsx)("div", {
          style: checkSubsequentImageExists(lightboxImages.length, lightboxState, +1) ? {
            cursor: "pointer"
          } : {},
          className: "lightbox__fullscreen-image--move-right",
          onClick: e => {
            setLightboxState(prev => prev !== null && Array.isArray(imageElements) && prev + 1 <= (imageElements === null || imageElements === void 0 ? void 0 : imageElements.length) - 1 ? prev + 1 : prev);
            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
          }
        }), (0, _jsxRuntime.jsx)("div", Object.assign({
          className: "lightbox__fullscreen--top-row"
        }, {
          children: (0, _jsxRuntime.jsx)("div", Object.assign({
            className: "lightbox__fullscreen--close-button",
            onClick: () => {
              lightboxOptionsActiveDispatch({
                type: _variables.lightboxReducerCases.fullscreen
              });
              resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
            }
          }, {
            children: (0, _jsxRuntime.jsx)(_material.ThemeProvider, Object.assign({
              theme: muiTheme
            }, {
              children: (0, _jsxRuntime.jsx)(_Close.default, {
                color: "primary",
                style: {
                  fontSize: "200%"
                }
              })
            }))
          }))
        }))]
      }))
    }))
  });
}
function CreateLightbox(lightboxOptionsActiveDispatch, setLightboxState, lightboxImages, lightboxDimensionsStyle, lightboxState, lightboxOptionsActive, tooltipsElems, fullscreenLightboxElems, imageElements, muiTheme, shuffleReset, autoplayReset) {
  var _a, _b, _c;
  const standardMargin = {
    ml: 1
  };
  const buttonStyleWithCursor = {
    fontSize: "200%",
    cursor: "pointer"
  };
  return (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: (0, _jsxRuntime.jsxs)("div", Object.assign({
      className: "lightbox" + (lightboxOptionsActive.curtain && " curtain" || "")
    }, {
      children: [fullscreenLightboxElems, (0, _jsxRuntime.jsxs)("div", Object.assign({
        className: "lightbox__backdrop",
        id: "lightboxArea"
      }, {
        children: [(0, _jsxRuntime.jsx)("div", Object.assign({
          className: "lightbox__top-row"
        }, {
          children: (0, _jsxRuntime.jsxs)(_material.ThemeProvider, Object.assign({
            theme: muiTheme
          }, {
            children: [(0, _jsxRuntime.jsx)(_PlayCircle.default, {
              sx: standardMargin,
              style: buttonStyleWithCursor,
              color: lightboxOptionsActive.autoplay ? "primary" : "secondary",
              onClick: () => {
                lightboxOptionsActiveDispatch({
                  type: _variables.lightboxReducerCases.autoplay
                });
              }
            }), (0, _jsxRuntime.jsx)(_Shuffle.default, {
              sx: standardMargin,
              style: buttonStyleWithCursor,
              color: lightboxOptionsActive.shuffle ? "primary" : "secondary",
              onClick: () => {
                lightboxOptionsActiveDispatch({
                  type: _variables.lightboxReducerCases.shuffle
                });
              }
            }), (0, _jsxRuntime.jsx)(_Fullscreen.default, {
              sx: standardMargin,
              style: buttonStyleWithCursor,
              color: lightboxOptionsActive.fullscreen ? "primary" : "secondary",
              onClick: () => {
                lightboxOptionsActiveDispatch({
                  type: _variables.lightboxReducerCases.fullscreen
                });
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
              }
            }), (0, _jsxRuntime.jsx)(_Curtains.default, {
              sx: standardMargin,
              style: buttonStyleWithCursor,
              color: lightboxOptionsActive.curtain ? "primary" : "secondary",
              onClick: () => {
                lightboxOptionsActiveDispatch({
                  type: _variables.lightboxReducerCases.curtain
                });
              }
            }), (0, _jsxRuntime.jsx)(_Info.default, {
              sx: standardMargin,
              style: buttonStyleWithCursor,
              color: lightboxOptionsActive.tooltip ? "primary" : "secondary",
              onClick: () => {
                handleLightboxButtons(lightboxOptionsActiveDispatch);
              }
            }), (0, _jsxRuntime.jsx)(_Close.default, {
              sx: {
                ml: 4
              },
              style: buttonStyleWithCursor,
              color: "primary",
              onClick: () => {
                setLightboxState(null);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
              }
            })]
          }))
        })), (0, _jsxRuntime.jsx)("div", Object.assign({
          className: "lightbox__middle-row"
        }, {
          children: (0, _jsxRuntime.jsxs)("div", Object.assign({
            className: "lightbox__image--subcontainer",
            style: lightboxDimensionsStyle
          }, {
            children: [(0, _jsxRuntime.jsx)("div", Object.assign({
              className: "lightbox__loading-indicator"
            }, {
              children: (0, _jsxRuntime.jsx)(_material.CircularProgress, {})
            })), (0, _jsxRuntime.jsx)(_image.default, {
              src: lightboxState !== null && ((_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.lg_img_url) || "",
              className: "lightbox__image",
              layout: "fill",
              style: {
                objectFit: "contain"
              },
              alt: lightboxState !== null && ((_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.alt) || ""
            }, lightboxState !== null && ((_c = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _c === void 0 ? void 0 : _c.lg_img_url) || ""), (0, _jsxRuntime.jsx)("div", {
              style: checkSubsequentImageExists(lightboxImages.length, lightboxState, -1) ? {
                cursor: "pointer"
              } : {},
              onClick: e => {
                setLightboxState(prev => prev !== null && prev - 1 > -1 ? prev - 1 : prev);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
              },
              className: "lightbox__image--move-left"
            }), (0, _jsxRuntime.jsx)("div", {
              style: checkSubsequentImageExists(lightboxImages.length, lightboxState, +1) ? {
                cursor: "pointer"
              } : {},
              onClick: e => {
                setLightboxState(prev => prev !== null && Array.isArray(imageElements) && prev + 1 <= (imageElements === null || imageElements === void 0 ? void 0 : imageElements.length) - 1 ? prev + 1 : prev);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                shuffleReset(true);
              },
              className: "lightbox__image--move-right"
            }), (lightboxOptionsActive === null || lightboxOptionsActive === void 0 ? void 0 : lightboxOptionsActive.tooltip) === true && tooltipsElems]
          }))
        })), (0, _jsxRuntime.jsx)("div", {
          className: "lightbox__bottom-row"
        })]
      }))]
    }))
  });
}
function resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset) {
  if (lightboxOptionsActive.autoplay) autoplayReset(true);
  if (lightboxOptionsActive.shuffle) shuffleReset(true);
}
function checkSubsequentImageExists(lightboxImageCount, lightboxState, direction) {
  if (lightboxState === null) return false;
  const range = Array.from({
    length: lightboxImageCount
  }, (v, i) => i);
  if (range[lightboxState + direction] !== undefined) return true;
  return false;
}