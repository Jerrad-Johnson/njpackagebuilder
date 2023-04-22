import {GalleryInputs, GalleryInputsWithDefaults} from "../types/njGallery";

function addDefaultsToGalleryInput(galleryInput: GalleryInputs): GalleryInputsWithDefaults{
    const galleryInputCopy = {...galleryInput}
    const defaultLightboxMuiButtonTheme = {
        palette: {
            primary: {
                main: '#555555',
                contrastText: '#000',
            },
            secondary: {
                main: '#dddddd',
                contrastText: '#fff',
            },
        },
    };
    const defaultFullscreenCloseButtonTheme = {
        palette: {
            primary: {
                main: '#dddddd',
                contrastText: '#fff',
            },
        }
    }

    const defaults: GalleryInputsWithDefaults = {
        images: galleryInputCopy.images,
        containerPadding: galleryInputCopy.containerPadding || 10,
        containerWidth: galleryInputCopy.containerWidth || "100%",
        targetRowHeight: galleryInputCopy.targetRowHeight || 300,
        justifyFinalRow: galleryInputCopy.justifyFinalRow || false,
        imagePadding: galleryInputCopy.imagePadding || {vertical: 10, horizontal: 10},
        maxRows: galleryInputCopy.maxRows || Number.POSITIVE_INFINITY,
        showIncompleteRows: (galleryInputCopy.showIncompleteRows === false ? false : true),
        targetRowHeightTolerance: galleryInputCopy.targetRowHeightTolerance || 0.25,
        lightboxMuiButtonTheme: galleryInputCopy.lightboxMuiButtonTheme || defaultLightboxMuiButtonTheme,
        lightboxFullscreenMuiCloseButtonTheme: galleryInputCopy.lightboxFullscreenMuiCloseButtonTheme || defaultFullscreenCloseButtonTheme,
    }

    return Object.assign(galleryInputCopy, defaults);
}

export default addDefaultsToGalleryInput;