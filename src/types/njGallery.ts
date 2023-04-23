import {Dispatch, MutableRefObject, ReactElement, SetStateAction} from "react";

export interface GalleryInputs {
    images: ImageData[];
    containerWidth?: string | number;
    containerPadding?: number;
    imagePadding?: ImagePaddingDirections;
    targetRowHeight?: number;
    showIncompleteRows?: boolean;
    targetRowHeightTolerance?: number;
    justifyFinalRow?: boolean;
    maxRows?: number;
    tooltip_left?: JSX.Element[];
    tooltip_right?: JSX.Element[];
    lightboxMuiButtonTheme?: any;
    lightboxFullscreenMuiCloseButtonTheme?: any;
}

export interface GalleryInputsWithDefaults extends GalleryInputs{
    containerWidth: string | number;
    containerPadding: number;
    imagePadding: ImagePaddingDirections;
    targetRowHeight: number;
    showIncompleteRows: boolean;
    targetRowHeightTolerance: number;
    justifyFinalRow: boolean;
    maxRows: number;
    lightboxMuiButtonTheme: any;
    lightboxFullscreenMuiCloseButtonTheme: any;
}

type ImagePaddingDirections = {
    vertical: number;
    horizontal: number;
}

export interface ImageData {
    src: string;
    blurSrc?: string;
    height: number;
    width: number;
    alt?: string;
    lg_img_url?: string;
    tooltip_left?: ReactElement;
    tooltip_right?: ReactElement;
    /*For Ideal Portraits*/
    date: string;
    iso: number;
    aperture: string;
    exposure: string;
    focal: string;
    lens: string;
    camera_model: string;
}
export type ImagesData = ImageData[];

export interface GalleryLayoutData {
    boxes: {
        aspectRatio: number;
        top: number;
        width: number;
        height: number;
        left: number;
    }[];
    containerHeight: number;
    widowCount: number;
}

export interface ReformattedGalleryLayout {
    boxHeight: number;
    boxWidth: number;
    imgSrc: string;
    lg_img_url?: string;
    imgBlurSrc?: string;
    alt?: string;
}

export interface GalleryStylesEssential {
    width: number | string;
    display: "flex";
    flexWrap: "wrap";
    padding: string;
}

export interface LightboxOptions {
    [key: string]: boolean;
    fullscreen: boolean;
    tooltip: boolean;
    shuffle: boolean;
    autoplay: boolean;
    curtain: boolean;
}

export interface Action {
    type: string;
    payload?: any;
}

export type LightboxState = null | number;
export type LightboxEverOpened = boolean;
export type SetLightboxState = Dispatch<SetStateAction<LightboxState>>;
export type GalleryElemRef = MutableRefObject<null | HTMLDivElement>;
export type SetLightboxEverOpened = Dispatch<SetStateAction<boolean>>;
export interface LightboxDimensionsObject {
    width: string;
    height: string;
}
export type LightboxDimensionsStyle = LightboxDimensionsObject | undefined;
