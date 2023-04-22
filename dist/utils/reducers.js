"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightboxOptionsActiveReducer = lightboxOptionsActiveReducer;
require("core-js/modules/es.object.assign.js");
var _variables = require("./variables");
const cc = console.log;
function lightboxOptionsActiveReducer(state, action) {
  switch (action.type) {
    case _variables.lightboxReducerCases.tooltip:
      setLocalStorage(state, String(_variables.lightboxReducerCases.tooltip));
      return Object.assign(Object.assign({}, state), {
        tooltip: !state.tooltip
      });
    case _variables.lightboxInitialValueCase:
      return Object.assign({}, setInitialValues(state));
    case _variables.lightboxReducerCases.fullscreen:
      setLocalStorage(state, String(_variables.lightboxReducerCases.fullscreen));
      return Object.assign(Object.assign({}, state), {
        fullscreen: !state.fullscreen
      });
    case _variables.lightboxReducerCases.fullscreenDisable:
      return Object.assign(Object.assign({}, state), {
        fullscreen: false
      });
    case _variables.lightboxReducerCases.shuffle:
      setLocalStorage(state, String(_variables.lightboxReducerCases.shuffle));
      if (state.autoplay && !state.shuffle) {
        setLocalStorageEntry(_variables.lightboxReducerCases.autoplay, _variables.booleanAsString.false);
      }
      return Object.assign(Object.assign({}, state), {
        shuffle: !state.shuffle,
        autoplay: false
      });
    case _variables.lightboxReducerCases.shuffleDisable:
      return Object.assign(Object.assign({}, state), {
        shuffle: false
      });
    case _variables.lightboxReducerCases.autoplay:
      if (state.shuffle && !state.autoplay) {
        setLocalStorageEntry(_variables.lightboxReducerCases.shuffle, _variables.booleanAsString.false);
      }
      setLocalStorage(state, String(_variables.lightboxReducerCases.autoplay));
      return Object.assign(Object.assign({}, state), {
        autoplay: !state.autoplay,
        shuffle: false
      });
    case _variables.lightboxReducerCases.autoplayDisable:
      return Object.assign(Object.assign({}, state), {
        autoplay: false
      });
    case _variables.lightboxReducerCases.curtain:
      setLocalStorage(state, String(_variables.lightboxReducerCases.curtain));
      return Object.assign(Object.assign({}, state), {
        curtain: !state.curtain
      });
    default:
      return Object.assign({}, state);
  }
}
function setLocalStorage(state, dataSelector) {
  localStorage.setItem(dataSelector, String(!state[dataSelector]));
}
function setInitialValues(state) {
  let stateCopy = Object.assign({}, state);
  for (let entry in _variables.lightboxOptions) {
    if (localStorage.getItem(entry) === _variables.booleanAsString.true) {
      stateCopy[entry] = true;
    } else if (localStorage.getItem(entry) === _variables.booleanAsString.false) {
      stateCopy[entry] = false;
    } else if (localStorage.getItem(entry) === null) {
      localStorage.setItem(entry, String(stateCopy[entry]));
    }
  }
  return stateCopy;
}
function setLocalStorageEntry(item, bool) {
  localStorage.setItem(item, String(bool));
}