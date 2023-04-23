import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useReducer, useRef, useState } from 'react';
import { checkInputForErrors } from "./utils/errorChecker";
import useResizeHook from "./hooks/useResizeHook";
import addGalleryDefaults from "./utils/galleryDefaults";
import createGalleryStyle from "./utils/galleryStyles";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { initialShowGalleryData } from "./utils/variables";
import { lightboxOptionsActiveReducer } from "./utils/reducers";
import useInterval from "./hooks/useInterval";
import { LightboxCloseOnClickOutsideElem, calculateImageSpecsForLightbox, HideNavbarWhenLightboxOpen, OnMount, OnPropsChange, createTooltipsElems, shuffleImages, getRandomWholeNumber, autoplayImages, CreateMUITheme, LightboxKeyPressHandler, CreateFullscreenLightboxElems, CreateLightbox } from "./utils/lightbox";
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
    checkInputForErrors(props);
    const galleryElemRef = useRef(null);
    const [imageElems, setImageElems] = useState(null);
    const [lightboxState, setLightboxState] = useState(null);
    const [lightboxEverOpened, setLightboxEverOpened] = useState(false);
    const [lightboxOptionsActive, lightboxOptionsActiveDispatch] = useReducer(lightboxOptionsActiveReducer, //@ts-ignore
    initialShowGalleryData);
    const [shuffleReset] = useInterval(() => {
        shuffleImages(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActiveDispatch, getRandomWholeNumber);
    }, lightboxState !== null && lightboxOptionsActive.shuffle ? 3000 : null);
    const [autoplayReset] = useInterval(() => {
        autoplayImages(lightboxImages, lightboxOptionsActiveDispatch, setLightboxState, lightboxState);
    }, lightboxState !== null && lightboxOptionsActive.autoplay ? 3000 : null);
    const galleryInputsWithDefaults = addGalleryDefaults(props); // TODO Design script to add original URL if large-img URL is not provided.
    const { containerPadding, containerWidth } = Object.assign({}, galleryInputsWithDefaults);
    const galleryCSS = createGalleryStyle(containerPadding, containerWidth);
    useResizeHook(setImageElems, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened);
    OnMount(lightboxOptionsActiveDispatch);
    OnPropsChange(props, galleryInputsWithDefaults, galleryElemRef, setLightboxState, setLightboxEverOpened, setImageElems, lightboxOptionsActiveDispatch);
    HideNavbarWhenLightboxOpen(lightboxState);
    LightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxOptionsActive, lightboxEverOpened, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset);
    const [windowHeight, windowWidth] = useWindowDimensions();
    const lightboxImages = [...galleryInputsWithDefaults.images];
    const lightboxDimensionsCSS = calculateImageSpecsForLightbox(lightboxState, lightboxImages, windowHeight, windowWidth);
    const lightboxMuiButtonTheme = CreateMUITheme(galleryInputsWithDefaults.lightboxMuiButtonTheme);
    LightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActive, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset);
    const tooltipsElems = createTooltipsElems(lightboxState, lightboxImages, windowWidth);
    const fullscreenLightboxElems = CreateFullscreenLightboxElems(lightboxOptionsActive, lightboxOptionsActiveDispatch, lightboxState, lightboxImages, setLightboxState, imageElems, shuffleReset, autoplayReset, galleryInputsWithDefaults.lightboxFullscreenMuiCloseButtonTheme);
    const lightboxElems = CreateLightbox(lightboxOptionsActiveDispatch, setLightboxState, lightboxImages, lightboxDimensionsCSS, lightboxState, lightboxOptionsActive, tooltipsElems, fullscreenLightboxElems, imageElems, lightboxMuiButtonTheme, shuffleReset, autoplayReset);
    return (_jsxs(_Fragment, { children: [lightboxState !== null && lightboxElems, _jsx("div", Object.assign({ className: "njGallery", style: galleryCSS, ref: galleryElemRef }, { children: imageElems }))] }));
}
export default NjGallery;
