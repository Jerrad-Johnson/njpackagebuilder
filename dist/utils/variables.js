"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightboxReducerCases = exports.lightboxOptions = exports.lightboxInitialValueCase = exports.initialShowGalleryData = exports.booleanAsString = void 0;
const lightboxOptions = {
  tooltip: "tooltip",
  fullscreen: "fullscreen",
  shuffle: "shuffle",
  autoplay: "autoplay",
  curtain: "curtain"
};
exports.lightboxOptions = lightboxOptions;
const lightboxOperations = {
  fullscreenDisable: "fullscreenDisable",
  shuffleDisable: "fullscreenDisable",
  autoplayDisable: "autoplayDisable",
  initialValue: "initialValue"
};
const initialShowGalleryData = {
  tooltip: true,
  fullscreen: false,
  shuffle: false,
  autoplay: true,
  curtain: true
};
exports.initialShowGalleryData = initialShowGalleryData;
const lightboxReducerCases = {
  tooltip: lightboxOptions.tooltip,
  fullscreen: lightboxOptions.fullscreen,
  fullscreenDisable: lightboxOperations.fullscreenDisable,
  shuffle: lightboxOptions.shuffle,
  shuffleDisable: lightboxOperations.shuffleDisable,
  autoplay: lightboxOptions.autoplay,
  autoplayDisable: lightboxOperations.autoplayDisable,
  curtain: lightboxOptions.curtain
};
exports.lightboxReducerCases = lightboxReducerCases;
const lightboxInitialValueCase = "initialValue";
exports.lightboxInitialValueCase = lightboxInitialValueCase;
const booleanAsString = {
  false: "false",
  true: "true"
};
exports.booleanAsString = booleanAsString;