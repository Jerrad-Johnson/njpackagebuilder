import {GalleryStylesEssential} from "../types/njGallery";

function createGalleryStyle(containerPadding: number, containerWidth: number | string): GalleryStylesEssential{
    return {
        "width": (containerWidth),
        "display": "flex",
        "flexWrap": "wrap",
        "padding": (containerPadding/2) + "px " + (containerPadding/2) + "px "
            + (containerPadding/2) + "px " + (containerPadding/2) + "px",
    }
}

export default createGalleryStyle;