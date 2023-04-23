import {
    Action, GalleryInputs,
    GalleryInputsWithDefaults,
    ImagesData, LightboxDimensionsStyle, LightboxEverOpened,
    LightboxOptions,
    LightboxState, SetLightboxEverOpened,
    SetLightboxState
} from "../types/njGallery";
import {Dispatch, MutableRefObject, ReactElement, SetStateAction, useEffect, useState} from "react";
import {lightboxInitialValueCase, lightboxReducerCases} from "./variables";
import createGalleryLayout from "./galleryLayout";
import useEventListener from "@use-it/event-listener";
import {CircularProgress, createTheme, Theme, ThemeProvider} from "@mui/material";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CurtainsIcon from "@mui/icons-material/Curtains";
import InfoIcon from "@mui/icons-material/Info";
const cc = console.log;
export function handleLightbox(event: React.MouseEvent<HTMLImageElement>,
                               galleryInputsWithDefaults: GalleryInputsWithDefaults,
                               setLightboxState: Dispatch<SetStateAction<number | null>>,
                               setLightboxEverOpened: Dispatch<SetStateAction<boolean>>): void{

    const eventTarget = event.target as HTMLDivElement;
    const url: string | null = eventTarget.getAttribute("data-largeimg");
    const position = galleryInputsWithDefaults.images.findIndex((elem) => {
        return elem.lg_img_url === url;
    });

    setLightboxState(position);
    setLightboxEverOpened(true);
}

export function handleLightboxButtons(lightboxDataDispatch: Dispatch<Action>): void{
    lightboxDataDispatch({type: lightboxReducerCases.tooltip})
}

export function LightboxCloseOnClickOutsideElem(lightboxState: LightboxState,
                                                setLightboxState: SetLightboxState,
                                                lightboxOptionsActive: LightboxOptions,
                                                lightboxEverOpened: LightboxEverOpened,
                                                lightboxOptionsActiveDispatch: Dispatch<Action>,
                                                shuffleReset: Dispatch<SetStateAction<boolean>>,
                                                autoplayReset: Dispatch<SetStateAction<boolean>>,
                                                ): void{
    const listener = (e: MouseEvent) => {
        if (lightboxState !== null) {
            const elem = document.getElementById("lightboxArea");
            const target = e.target as HTMLDivElement | null;
            if (!elem?.contains(target) && lightboxOptionsActive.fullscreen !== true){
                setLightboxState(null);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreenDisable})
            }
        }
    }

    useEffect(() => {
        if (lightboxEverOpened) window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
    }, [lightboxEverOpened]);
}

export function calculateImageSpecsForLightbox(lightboxState: LightboxState,
                                               lightboxImages: ImagesData,
                                               windowHeight: number,
                                               windowWidth: number
                                               ): LightboxDimensionsStyle{
    let activeImageWidth = 0;
    if (lightboxState !== null) activeImageWidth = lightboxImages?.[lightboxState]?.width;
    let activeImageHeight = 0 ;
    if (lightboxState !== null) activeImageHeight = lightboxImages?.[lightboxState]?.height;

    let ratio = activeImageHeight/activeImageWidth <= 1
        ? activeImageHeight/activeImageWidth : activeImageWidth/activeImageHeight;
    let imageIsPortraitOrientation = activeImageWidth < activeImageHeight;
    let unitsToTopOfLightbox = 0;
    let unitsToSideOfLightbox = 0;

    if (imageIsPortraitOrientation){
        unitsToTopOfLightbox = windowHeight / 80;
        unitsToSideOfLightbox = windowWidth / (80*ratio);
    } else {
        unitsToTopOfLightbox = windowHeight / (80*ratio);
        unitsToSideOfLightbox = windowWidth / 80;
    }

    let lightboxDimensionsStyle;
    if (unitsToTopOfLightbox < unitsToSideOfLightbox && !imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowHeight*.8}px`, width: `${windowHeight*(.8*(1/ratio))}px`};
    } else if (unitsToTopOfLightbox < unitsToSideOfLightbox && imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowHeight*(.8)}px`, width: `${windowHeight*(.8*ratio)}px`};
    } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && !imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowWidth*(.8*(ratio))}px`, width: `${windowWidth*(.8)}px`};
    } else if (unitsToTopOfLightbox > unitsToSideOfLightbox && imageIsPortraitOrientation){
        lightboxDimensionsStyle = {height: `${windowWidth*(.8*(1/ratio))}px`, width: `${windowWidth*(.8)}px`};
    }

    return lightboxDimensionsStyle;
}

export function HideNavbarWhenLightboxOpen(lightboxState: LightboxState): void{
    useEffect(() => {
        if (lightboxState === null){
            const navbarElem: HTMLElement | null = document.querySelector(".navbar");
            if (navbarElem !== null) navbarElem.style.zIndex = "10";
        } else {
            const navbarElem: HTMLElement | null = document.querySelector(".navbar");
            if (navbarElem !== null) navbarElem.style.zIndex = "1";
        }
    }, [lightboxState]);
}

export function OnMount(lightboxOptionsActiveDispatch: Dispatch<Action>): void{
    useEffect(() => {
        lightboxOptionsActiveDispatch({type: lightboxInitialValueCase})
    }, []);
}

export function OnPropsChange(props: GalleryInputs,
                              galleryInputsWithDefaults: GalleryInputsWithDefaults,
                              galleryElementRef: MutableRefObject<HTMLDivElement | null>,
                              setLightboxState: SetLightboxState,
                              setLightboxEverOpened: SetLightboxEverOpened,
                              setImageElements: Dispatch<SetStateAction<JSX.Element[] | null>>,
                              lightboxOptionsActiveDispatch: Dispatch<Action>
                              ): void{
    useEffect(() => {
        setImageElements((prevElements) => createGalleryLayout(galleryInputsWithDefaults,
            galleryElementRef, setLightboxState, setLightboxEverOpened, prevElements));
    }, [props]);
}

export function createTooltipsElems(lightboxState: LightboxState,
                                    lightboxImages: ImagesData,
                                    windowWidth: number): ReactElement{

    return (
        <>
            { windowWidth > 800 && (
            <>{/*@ts-ignore*/}
                { lightboxImages?.[lightboxState]?.tooltip_left &&
                <div className={"lightbox__tooltip--left"}>
                    <div className={"lightbox__tooltip--left-container"}>
                        {/*@ts-ignore*/}
                         {lightboxImages?.[lightboxState]?.tooltip_left}
                    </div>
                </div>
                }
{/*@ts-ignore*/}
                { lightboxImages?.[lightboxState]?.tooltip_right &&
                <div className={"lightbox__tooltip--right"}>
                    {/*@ts-ignore*/}
                    <div className={"lightbox__tooltip--right-container"}>
                        {/*@ts-ignore*/}
                        {lightboxImages?.[lightboxState]?.tooltip_right}
                    </div>
                </div>
                }
            </>
        )}
{/*@ts-ignore*/}
            { windowWidth <= 800 && (lightboxImages?.[lightboxState]?.tooltip_left || lightboxImages?.[lightboxState]?.tooltip_left) &&

                <div className={"lightbox__tooltip--combined"}>
                    <div className={"lightbox__tooltip--combined-container"}>
                    {/*@ts-ignore*/}
                        {lightboxImages?.[lightboxState]?.tooltip_left && lightboxImages?.[lightboxState]?.tooltip_left}
                    {/*@ts-ignore*/}
                        {lightboxImages?.[lightboxState]?.tooltip_right && lightboxImages?.[lightboxState]?.tooltip_right}
                    </div>
                </div>
            }
        </>
    )
}

export function LightboxKeyPressHandler(lightboxImages: ImagesData,
                                        lightboxState: LightboxState,
                                        setLightboxState: SetLightboxState,
                                        lightboxOptionsActive: LightboxOptions,
                                        lightboxOptionsActiveDispatch: Dispatch<Action>,
                                        shuffleReset: Dispatch<SetStateAction<boolean>>,
                                        autoplayReset: Dispatch<SetStateAction<boolean>>,
                                        ): void{

    const listener = (e: KeyboardEvent) => {
        if (lightboxState !== null){
            //27 == escape key, 39 == right arrow, 37 == left arrow.
            if (e.keyCode === 39 && lightboxState < lightboxImages?.length-1 && lightboxState !== null){
                setLightboxState((prev) => { return (prev !== null ? prev+1 : prev)});
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
            if (e.keyCode === 37 && lightboxState > 0 && lightboxState !== null){
                setLightboxState((prev) => { return (prev !== null ? prev-1 : prev)});
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
            if (e.keyCode === 27 && lightboxState !== null && lightboxOptionsActive.fullscreen){
                lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreen});
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
            if (e.keyCode === 27 && lightboxState !== null && !lightboxOptionsActive.fullscreen){
                setLightboxState(null);
                resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset, autoplayReset)
                return;
            }
        }
    }

    useEventListener("keydown", listener);
}

export const autoplayImages = (lightboxImages: ImagesData,
                               lightboxOptionsActiveDispatch: Dispatch<Action>,
                               setLightboxState: SetLightboxState,
                               lightboxState: LightboxState
                               ): void => {
    if (lightboxImages.length === 1) lightboxOptionsActiveDispatch({type: lightboxReducerCases.autoplayDisable});
    const currentPosition = lightboxState;
    const end = lightboxImages.length-1, beginning = 0;
    currentPosition === end ? setLightboxState(0) : setLightboxState((prev: number | null) => {
        if (prev !== null) return prev+1
        return prev;
    })
}
//@ts-ignore
export const shuffleImages = (lightboxImages: ImagesData,
                              lightboxState: LightboxState,
                              setLightboxState: SetLightboxState,
                              lightboxOptionsActiveDispatch: Dispatch<Action>,
                              getRandomWholeNumber: (num: number, currentNum?: number | null) => number,
                              ) => {
    if (lightboxImages.length === 1) return 0;
    const currentPosition = lightboxState;//@ts-ignore
    setLightboxState(getRandomWholeNumber(lightboxImages.length, currentPosition, lightboxImages));
}

export function getRandomWholeNumber(num: number,
                                     currentNum: number | null = null,
                                     lightboxImages: ImagesData
                                     ): number{
    if (lightboxImages.length === 1) return 0;
    const random = Math.floor(Math.random() * num);
    if (random === currentNum) return getRandomWholeNumber(num, currentNum, lightboxImages);
    return random;
}

export function CreateMUITheme(muiLightboxButtonTheme: any){
    return createTheme(muiLightboxButtonTheme);
}


export function CreateFullscreenLightboxElems(lightboxOptionsActive: LightboxOptions,
                                              lightboxOptionsActiveDispatch: Dispatch<Action>,
                                              lightboxState: LightboxState,
                                              lightboxImages: ImagesData,
                                              setLightboxState: SetLightboxState,
                                              imageElements: JSX.Element[] | null,
                                              shuffleReset: Dispatch<SetStateAction<boolean>>,
                                              autoplayReset: Dispatch<SetStateAction<boolean>>,
                                              lightboxFullscreenMuiCloseButtonTheme,
                                              ): ReactElement{
    const muiTheme = createTheme(lightboxFullscreenMuiCloseButtonTheme);

    return (
        <>
            <div className={"lightbox__fullscreen" + (lightboxOptionsActive.fullscreen === true ? " active" : "") }
                 onClick={(e) => e.stopPropagation() }
            >
                <div className={"lightbox__fullscreen--image-container"
                    + (lightboxOptionsActive.fullscreen === true ? " active" : "" )}
                     onClick={(e) => {
                         if (lightboxOptionsActive.fullscreen === false) return;
                     }}>
                        <div className={"lightbox__loading-indicator"}>
                            <CircularProgress />
                        </div>
                    <Image
                        key={lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                        src={ lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                        className={"lightbox__image"}
                        layout={"fill"}
                        style={{objectFit: "contain", }}
                        alt={ lightboxState !== null && lightboxImages?.[lightboxState]?.alt || ""}
                    />
                    <div
                        className={"lightbox__fullscreen-image--move-left"}
                        style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, -1))
                            ? {cursor: "pointer"} : {})}
                        onClick={(e) => {
                            setLightboxState((prev: LightboxState) =>
                                (prev !== null && prev-1 > -1) ? prev-1 : prev)
                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset,
                                autoplayReset);
                        }} />
                    <div
                        style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, +1))
                            ? {cursor: "pointer"} : {})}
                        className={"lightbox__fullscreen-image--move-right"}
                        onClick={(e) => {
                            setLightboxState((prev: LightboxState) => (prev !== null
                                && Array.isArray(imageElements)
                                && prev+1 <= imageElements?.length-1) ? prev+1 : prev)
                            resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset,
                                autoplayReset);
                        }} />
                    <div className={"lightbox__fullscreen--top-row"}>
                        <div className={"lightbox__fullscreen--close-button"}
                             onClick={() => {
                                 lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreen});
                                 resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive, shuffleReset,
                                     autoplayReset)
                             }}>
                            <ThemeProvider theme={muiTheme}>
                                <CloseIcon
                                    color={"primary"}
                                    style={{fontSize: "200%"}}
                                />
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function CreateLightbox(lightboxOptionsActiveDispatch: Dispatch<Action>,
                               setLightboxState: SetLightboxState,
                               lightboxImages: ImagesData,
                               lightboxDimensionsStyle: LightboxDimensionsStyle,
                               lightboxState: LightboxState,
                               lightboxOptionsActive: LightboxOptions,
                               tooltipsElems: JSX.Element,
                               fullscreenLightboxElems: JSX.Element,
                               imageElements: JSX.Element[] | null,
                               muiTheme: Theme,
                               shuffleReset: Dispatch<SetStateAction<boolean>>,
                               autoplayReset: Dispatch<SetStateAction<boolean>>,
                               ): ReactElement{

    const standardMargin = {ml: 1};
    const buttonStyleWithCursor = {fontSize: "200%", cursor: "pointer"}

    return (
        <>
            <div className={"lightbox" + (lightboxOptionsActive.curtain && " curtain" || "")}>
                {fullscreenLightboxElems}
                <div className={"lightbox__backdrop"} id={"lightboxArea"}>
                    <div className={"lightbox__top-row"}>
                        <ThemeProvider theme={muiTheme}>
                            <PlayCircleIcon
                                sx={standardMargin}
                                style={(buttonStyleWithCursor)}
                                color={(lightboxOptionsActive.autoplay ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.autoplay});
                                }}
                            />
                            <ShuffleIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.shuffle ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.shuffle});
                                }}
                            />
                            <FullscreenIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.fullscreen ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.fullscreen});
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset)
                                }}
                            />
                            <CurtainsIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.curtain ? "primary" : "secondary")}
                                onClick={() => {
                                    lightboxOptionsActiveDispatch({type: lightboxReducerCases.curtain});
                                }}
                            />
                            <InfoIcon
                                sx={standardMargin}
                                style={buttonStyleWithCursor}
                                color={(lightboxOptionsActive.tooltip ? "primary" : "secondary")}
                                onClick={() => {
                                    handleLightboxButtons(lightboxOptionsActiveDispatch);
                                }}
                            />
                            <CloseIcon
                                sx={{ml: 4}}
                                style={buttonStyleWithCursor}
                                color={"primary"}
                                onClick={() => {
                                    setLightboxState(null);
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset)
                                }}
                            />
                        </ThemeProvider>
                    </div>

                    <div className={"lightbox__middle-row"}>
                        <div className={"lightbox__image--subcontainer"} style={lightboxDimensionsStyle}>
                                <div className={"lightbox__loading-indicator"}>
                                    <CircularProgress/>
                                </div>

                            <Image
                                key={lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                                src={ lightboxState !== null && lightboxImages?.[lightboxState]?.lg_img_url || ""}
                                className={"lightbox__image"}
                                layout={"fill"}
                                style={{objectFit: "contain", }}
                                alt={ lightboxState !== null && lightboxImages?.[lightboxState]?.alt || ""}
                            />

                            <div
                                style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, -1))
                                    ? {cursor: "pointer"} : {})}
                                onClick={(e) => {
                                    setLightboxState((prev: LightboxState) => (prev !== null && prev-1 > -1)
                                        ? prev-1 : prev)
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset);
                            }}
                                className={"lightbox__image--move-left"}>
                            </div>

                            <div
                                style={((checkSubsequentImageExists(lightboxImages.length, lightboxState, +1))
                                    ? {cursor: "pointer"} : {})}
                                onClick={(e) => {
                                    setLightboxState((prev: LightboxState) => (prev !== null
                                        && Array.isArray(imageElements) && prev+1 <= imageElements?.length-1)
                                        ? prev+1 : prev)
                                    resetAutoplayIfTrue(lightboxOptionsActiveDispatch, lightboxOptionsActive,
                                        shuffleReset, autoplayReset);
                                    shuffleReset(true);
                                }}
                                className={"lightbox__image--move-right"}>
                            </div>
                            {lightboxOptionsActive?.tooltip === true && tooltipsElems}
                        </div>
                    </div>

                    <div className={"lightbox__bottom-row"}></div>
                </div>
            </div>
        </>
    );
}

function resetAutoplayIfTrue(lightboxOptionsActiveDispatch: Dispatch<Action>,
                             lightboxOptionsActive: LightboxOptions,
                             shuffleReset: Dispatch<SetStateAction<boolean>>,
                             autoplayReset: Dispatch<SetStateAction<boolean>>,
                             ): void{
    if (lightboxOptionsActive.autoplay) autoplayReset(true);
    if (lightboxOptionsActive.shuffle) shuffleReset(true);
}

function checkSubsequentImageExists(lightboxImageCount: number,
                                    lightboxState: LightboxState,
                                    direction: number,
                                    ): boolean{
    if (lightboxState === null) return false;
    const range = Array.from({length: lightboxImageCount}, (v, i) => i);
    if (range[lightboxState + direction] !== undefined) return true;
    return false;
}