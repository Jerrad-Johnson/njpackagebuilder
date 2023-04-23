function createGalleryStyle(containerPadding, containerWidth) {
    return {
        "width": (containerWidth),
        "display": "flex",
        "flexWrap": "wrap",
        "padding": (containerPadding / 2) + "px " + (containerPadding / 2) + "px "
            + (containerPadding / 2) + "px " + (containerPadding / 2) + "px",
    };
}
export default createGalleryStyle;
