export const lightboxOptions = {
    tooltip: "tooltip",
    fullscreen: "fullscreen",
    shuffle: "shuffle",
    autoplay: "autoplay",
    curtain: "curtain",
}

const lightboxOperations = {
    fullscreenDisable: "fullscreenDisable",
    shuffleDisable: "fullscreenDisable",
    autoplayDisable: "autoplayDisable",
    initialValue: "initialValue",
}

export const initialShowGalleryData = {
    tooltip: true,
    fullscreen: false,
    shuffle: false,
    autoplay: true,
    curtain: true,
}

export const lightboxReducerCases = {
    tooltip: lightboxOptions.tooltip,
    fullscreen: lightboxOptions.fullscreen,
    fullscreenDisable: lightboxOperations.fullscreenDisable,
    shuffle: lightboxOptions.shuffle,
    shuffleDisable: lightboxOperations.shuffleDisable,
    autoplay: lightboxOptions.autoplay,
    autoplayDisable: lightboxOperations.autoplayDisable,
    curtain: lightboxOptions.curtain,
}

export const lightboxInitialValueCase = "initialValue";

export const booleanAsString = {
    false: "false",
    true: "true"
}