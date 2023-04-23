import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { lightboxInitialValueCase, lightboxReducerCases } from "./variables";
import createGalleryLayout from "./galleryLayout";
import useEventListener from "@use-it/event-listener";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CurtainsIcon from "@mui/icons-material/Curtains";
import InfoIcon from "@mui/icons-material/Info";
const cc = console.log;
export function handleLightbox(event, galleryInputsWithDefaults, setLightboxState, setLightboxEverOpened) {
    const eventTarget = event.target;
    const url = eventTarget.getAttribute("data-largeimg");
    const position = galleryInputsWithDefaults.images.findIndex((elem) => {
        return elem.lg_img_url === url;
    });
    setLightboxState(position);
    setLightboxEverOpened(true);
}
export function handleLightboxButtons(lightboxDataDispatch) {
    lightboxDataDispatch({ type: lightboxReducerCases.tooltip });
}
export function LightboxCloseOnClickOutsideElem(lightboxState, setLightboxState, lightboxOptionsActive, lightboxEverOpened, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset) {
    const listener = (e) => {
        if (lightboxState !== null) {
            const elem = document.getElementById("lightboxArea");
            const target = e.target;
            if (!(elem === null || elem === void 0 ? void 0 : elem.contains(target)) && lightboxOptionsActive.fullscreen !== true) {
                setLightboxState(null);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                lightboxOptionsActiveDispatch({ type: lightboxReducerCases.fullscreenDisable });
            }
        }
    };
    useEffect(() => {
        if (lightboxEverOpened)
            window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
    }, [lightboxEverOpened]);
}
export function calculateImageSpecsForLightbox(lightboxState, lightboxImages, windowHeight, windowWidth) {
    var _a, _b;
    let activeImageWidth = 0;
    if (lightboxState !== null)
        activeImageWidth = (_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.width;
    let activeImageHeight = 0;
    if (lightboxState !== null)
        activeImageHeight = (_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.height;
    let ratio = activeImageHeight / activeImageWidth <= 1
        ? activeImageHeight / activeImageWidth : activeImageWidth / activeImageHeight;
    let imageIsPortraitOrientation = activeImageWidth < activeImageHeight;
    let unitsToTopOfLightbox = 0;
    let unitsToSideOfLightbox = 0;
    if (imageIsPortraitOrientation) {
        unitsToTopOfLightbox = windowHeight / 80;
        unitsToSideOfLightbox = windowWidth / (80 * ratio);
    }
    else {
        unitsToTopOfLightbox = windowHeight / (80 * ratio);
        unitsToSideOfLightbox = windowWidth / 80;
    }
    let lightboxDimensionsStyle;
    if (unitsToTopOfLightbox < unitsToSideOfLightbox && !imageIsPortraitOrientation) {
        lightboxDimensionsStyle = { height: `${windowHeight * .8}px`, width: `${windowHeight * (.8 * (1 / ratio))}px` };
    }
    else if (unitsToTopOfLightbox < unitsToSideOfLightbox && imageIsPortraitOrientation) {
        lightboxDimensionsStyle = { height: `${windowHeight * (.8)}px`, width: `${windowHeight * (.8 * ratio)}px` };
    }
    else if (unitsToTopOfLightbox > unitsToSideOfLightbox && !imageIsPortraitOrientation) {
        lightboxDimensionsStyle = { height: `${windowWidth * (.8 * (ratio))}px`, width: `${windowWidth * (.8)}px` };
    }
    else if (unitsToTopOfLightbox > unitsToSideOfLightbox && imageIsPortraitOrientation) {
        lightboxDimensionsStyle = { height: `${windowWidth * (.8 * (1 / ratio))}px`, width: `${windowWidth * (.8)}px` };
    }
    return lightboxDimensionsStyle;
}
export function HideNavbarWhenLightboxOpen(lightboxState) {
    useEffect(() => {
        if (lightboxState === null) {
            const navbarElem = document.querySelector(".navbar");
            if (navbarElem !== null)
                navbarElem.style.zIndex = "10";
        }
        else {
            const navbarElem = document.querySelector(".navbar");
            if (navbarElem !== null)
                navbarElem.style.zIndex = "1";
        }
    }, [lightboxState]);
}
export function OnMount(lightboxOptionsActiveDispatch) {
    useEffect(() => {
        lightboxOptionsActiveDispatch({ type: lightboxInitialValueCase });
    }, []);
}
export function OnPropsChange(props, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened, setImageElements, lightboxOptionsActiveDispatch) {
    useEffect(() => {
        setImageElements((prevElements) => createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened, prevElements));
    }, [props]);
}
export function createTooltipsElems(lightboxState, lightboxImages, windowWidth) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return (_jsxs(_Fragment, { children: [windowWidth > 800 && (_jsxs(_Fragment, { children: [((_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.tooltip_left) &&
                        _jsx("div", Object.assign({ className: "lightbox__tooltip--left" }, { children: _jsx("div", Object.assign({ className: "lightbox__tooltip--left-container" }, { children: (_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.tooltip_left })) })), ((_c = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _c === void 0 ? void 0 : _c.tooltip_right) &&
                        _jsx("div", Object.assign({ className: "lightbox__tooltip--right" }, { children: _jsx("div", Object.assign({ className: "lightbox__tooltip--right-container" }, { children: (_d = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _d === void 0 ? void 0 : _d.tooltip_right })) }))] })), windowWidth <= 800 && (((_e = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _e === void 0 ? void 0 : _e.tooltip_left) || ((_f = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _f === void 0 ? void 0 : _f.tooltip_left)) &&
                _jsx("div", Object.assign({ className: "lightbox__tooltip--combined" }, { children: _jsxs("div", Object.assign({ className: "lightbox__tooltip--combined-container" }, { children: [((_g = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _g === void 0 ? void 0 : _g.tooltip_left) && ((_h = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _h === void 0 ? void 0 : _h.tooltip_left), ((_j = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _j === void 0 ? void 0 : _j.tooltip_right) && ((_k = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _k === void 0 ? void 0 : _k.tooltip_right)] })) }))] }));
}
export function LightboxKeyPressHandler(lightboxImages, lightboxState, setLightboxState, lightboxOptionsActive, lightboxOptionsActiveDispatch, shuffleReset, autoplayReset) {
    const listener = (e) => {
        if (lightboxState !== null) {
            //27 == escape key, 39 == right arrow, 37 == left arrow.
            if (e.keyCode === 39 && lightboxState < (lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages.length) - 1 && lightboxState !== null) {
                setLightboxState((prev) => { return (prev !== null ? prev + 1 : prev); });
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                return;
            }
            if (e.keyCode === 37 && lightboxState > 0 && lightboxState !== null) {
                setLightboxState((prev) => { return (prev !== null ? prev - 1 : prev); });
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                return;
            }
            if (e.keyCode === 27 && lightboxState !== null && lightboxOptionsActive.fullscreen) {
                lightboxOptionsActiveDispatch({ type: lightboxReducerCases.fullscreen });
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
    useEventListener("keydown", listener);
}
export const autoplayImages = (lightboxImages, lightboxOptionsActiveDispatch, setLightboxState, lightboxState) => {
    if (lightboxImages.length === 1)
        lightboxOptionsActiveDispatch({ type: lightboxReducerCases.autoplayDisable });
    const currentPosition = lightboxState;
    const end = lightboxImages.length - 1, beginning = 0;
    currentPosition === end ? setLightboxState(0) : setLightboxState((prev) => {
        if (prev !== null)
            return prev + 1;
        return prev;
    });
};
//@ts-ignore
export const shuffleImages = (lightboxImages, lightboxState, setLightboxState, lightboxOptionsActiveDispatch, getRandomWholeNumber) => {
    if (lightboxImages.length === 1)
        return 0;
    const currentPosition = lightboxState; //@ts-ignore
    setLightboxState(getRandomWholeNumber(lightboxImages.length, currentPosition, lightboxImages));
};
export function getRandomWholeNumber(num, currentNum = null, lightboxImages) {
    if (lightboxImages.length === 1)
        return 0;
    const random = Math.floor(Math.random() * num);
    if (random === currentNum)
        return getRandomWholeNumber(num, currentNum, lightboxImages);
    return random;
}
export function CreateMUITheme(muiLightboxButtonTheme) {
    return createTheme(muiLightboxButtonTheme);
}
export function CreateFullscreenLightboxElems(lightboxOptionsActive, lightboxOptionsActiveDispatch, lightboxState, lightboxImages, setLightboxState, imageElements, shuffleReset, autoplayReset, lightboxFullscreenMuiCloseButtonTheme) {
    var _a, _b, _c;
    const muiTheme = createTheme(lightboxFullscreenMuiCloseButtonTheme);
    return (_jsx(_Fragment, { children: _jsx("div", Object.assign({ className: "lightbox__fullscreen" + (lightboxOptionsActive.fullscreen === true ? " active" : ""), onClick: (e) => e.stopPropagation() }, { children: _jsxs("div", Object.assign({ className: "lightbox__fullscreen--image-container"
                    + (lightboxOptionsActive.fullscreen === true ? " active" : ""), onClick: (e) => {
                    if (lightboxOptionsActive.fullscreen === false)
                        return;
                } }, { children: [_jsx("div", Object.assign({ className: "lightbox__loading-indicator" }, { children: _jsx(CircularProgress, {}) })), _jsx(Image, { src: lightboxState !== null && ((_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.lg_img_url) || "", className: "lightbox__image", layout: "fill", style: { objectFit: "contain", }, alt: lightboxState !== null && ((_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.alt) || "" }, lightboxState !== null && ((_c = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _c === void 0 ? void 0 : _c.lg_img_url) || ""), _jsx("div", { className: "lightbox__fullscreen-image--move-left", style: ((checkSubsequentImageExists(lightboxImages.length, lightboxState, -1))
                            ? { cursor: "pointer" } : {}), onClick: (e) => {
                            setLightboxState((prev) => (prev !== null && prev - 1 > -1) ? prev - 1 : prev);
                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                        } }), _jsx("div", { style: ((checkSubsequentImageExists(lightboxImages.length, lightboxState, +1))
                            ? { cursor: "pointer" } : {}), className: "lightbox__fullscreen-image--move-right", onClick: (e) => {
                            setLightboxState((prev) => (prev !== null
                                && Array.isArray(imageElements)
                                && prev + 1 <= (imageElements === null || imageElements === void 0 ? void 0 : imageElements.length) - 1) ? prev + 1 : prev);
                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                        } }), _jsx("div", Object.assign({ className: "lightbox__fullscreen--top-row" }, { children: _jsx("div", Object.assign({ className: "lightbox__fullscreen--close-button", onClick: () => {
                                lightboxOptionsActiveDispatch({ type: lightboxReducerCases.fullscreen });
                                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                            } }, { children: _jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: _jsx(CloseIcon, { color: "primary", style: { fontSize: "200%" } }) })) })) }))] })) })) }));
}
export function CreateLightbox(lightboxOptionsActiveDispatch, setLightboxState, lightboxImages, lightboxDimensionsStyle, lightboxState, lightboxOptionsActive, tooltipsElems, fullscreenLightboxElems, imageElements, muiTheme, shuffleReset, autoplayReset) {
    var _a, _b, _c;
    const standardMargin = { ml: 1 };
    const buttonStyleWithCursor = { fontSize: "200%", cursor: "pointer" };
    return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ className: "lightbox" + (lightboxOptionsActive.curtain && " curtain" || "") }, { children: [fullscreenLightboxElems, _jsxs("div", Object.assign({ className: "lightbox__backdrop", id: "lightboxArea" }, { children: [_jsx("div", Object.assign({ className: "lightbox__top-row" }, { children: _jsxs(ThemeProvider, Object.assign({ theme: muiTheme }, { children: [_jsx(PlayCircleIcon, { sx: standardMargin, style: (buttonStyleWithCursor), color: (lightboxOptionsActive.autoplay ? "primary" : "secondary"), onClick: () => {
                                            lightboxOptionsActiveDispatch({ type: lightboxReducerCases.autoplay });
                                        } }), _jsx(ShuffleIcon, { sx: standardMargin, style: buttonStyleWithCursor, color: (lightboxOptionsActive.shuffle ? "primary" : "secondary"), onClick: () => {
                                            lightboxOptionsActiveDispatch({ type: lightboxReducerCases.shuffle });
                                        } }), _jsx(FullscreenIcon, { sx: standardMargin, style: buttonStyleWithCursor, color: (lightboxOptionsActive.fullscreen ? "primary" : "secondary"), onClick: () => {
                                            lightboxOptionsActiveDispatch({ type: lightboxReducerCases.fullscreen });
                                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                                        } }), _jsx(CurtainsIcon, { sx: standardMargin, style: buttonStyleWithCursor, color: (lightboxOptionsActive.curtain ? "primary" : "secondary"), onClick: () => {
                                            lightboxOptionsActiveDispatch({ type: lightboxReducerCases.curtain });
                                        } }), _jsx(InfoIcon, { sx: standardMargin, style: buttonStyleWithCursor, color: (lightboxOptionsActive.tooltip ? "primary" : "secondary"), onClick: () => {
                                            handleLightboxButtons(lightboxOptionsActiveDispatch);
                                        } }), _jsx(CloseIcon, { sx: { ml: 4 }, style: buttonStyleWithCursor, color: "primary", onClick: () => {
                                            setLightboxState(null);
                                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                                        } })] })) })), _jsx("div", Object.assign({ className: "lightbox__middle-row" }, { children: _jsxs("div", Object.assign({ className: "lightbox__image--subcontainer", style: lightboxDimensionsStyle }, { children: [_jsx("div", Object.assign({ className: "lightbox__loading-indicator" }, { children: _jsx(CircularProgress, {}) })), _jsx(Image, { src: lightboxState !== null && ((_a = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _a === void 0 ? void 0 : _a.lg_img_url) || "", className: "lightbox__image", layout: "fill", style: { objectFit: "contain", }, alt: lightboxState !== null && ((_b = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _b === void 0 ? void 0 : _b.alt) || "" }, lightboxState !== null && ((_c = lightboxImages === null || lightboxImages === void 0 ? void 0 : lightboxImages[lightboxState]) === null || _c === void 0 ? void 0 : _c.lg_img_url) || ""), _jsx("div", { style: ((checkSubsequentImageExists(lightboxImages.length, lightboxState, -1))
                                            ? { cursor: "pointer" } : {}), onClick: (e) => {
                                            setLightboxState((prev) => (prev !== null && prev - 1 > -1)
                                                ? prev - 1 : prev);
                                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                                        }, className: "lightbox__image--move-left" }), _jsx("div", { style: ((checkSubsequentImageExists(lightboxImages.length, lightboxState, +1))
                                            ? { cursor: "pointer" } : {}), onClick: (e) => {
                                            setLightboxState((prev) => (prev !== null
                                                && Array.isArray(imageElements) && prev + 1 <= (imageElements === null || imageElements === void 0 ? void 0 : imageElements.length) - 1)
                                                ? prev + 1 : prev);
                                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset);
                                            shuffleReset(true);
                                        }, className: "lightbox__image--move-right" }), (lightboxOptionsActive === null || lightboxOptionsActive === void 0 ? void 0 : lightboxOptionsActive.tooltip) === true && tooltipsElems] })) })), _jsx("div", { className: "lightbox__bottom-row" })] }))] })) }));
}
function resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset) {
    if (lightboxOptionsActive.autoplay)
        autoplayReset(true);
    if (lightboxOptionsActive.shuffle)
        shuffleReset(true);
}
function checkSubsequentImageExists(lightboxImageCount, lightboxState, direction) {
    if (lightboxState === null)
        return false;
    const range = Array.from({ length: lightboxImageCount }, (v, i) => i);
    if (range[lightboxState + direction] !== undefined)
        return true;
    return false;
}
