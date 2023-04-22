import {GalleryInputs} from "../types/njGallery";
const cc = console.log;


export function checkInputForErrors(galleryInputsFromUser: GalleryInputs): void{
    const {images, containerPadding, imagePadding, targetRowHeight, targetRowHeightTolerance,
        showIncompleteRows, maxRows } = {...galleryInputsFromUser};

    if (!images) throw new Error(`You must an images array. This can be an empty array.`);

    for (let image of images){
        if (!image.src) throw new Error(`Every image must include a source (URL), but is missing on ${image.src}`);
        if (!image.lg_img_url){
            throw new Error(`Every image must include lg_img_url,  but is missing on ${image.src}.`);
        }
        if (!image.width) throw new Error(`Every image must include a width value, but is missing on ${image.src}`);
        if (!image.height) throw new Error(`Every image must include a height value, but is missing on ${image.src}`);
        if (typeof image.width !== "number") throw new Error(`Image Width must be a number, not a string. Please fix entry ${image.src}`);
        if (typeof image.height !== "number") throw new Error(`Image Height must be a number, not a string. Please fix entry ${image.src}`);
        if (image.blurSrc === "") throw new Error(`Blur Src must not be an empty string. Provide a URL, or leave it undefined. Please fix entry ${image.src}`);
        if (image.tooltip_left && String(image.tooltip_left["$$typeof"]) !== "Symbol(react.element)"){
            throw new Error(`If you include a left tooltip, it must be a React JSX element. Please fix entry ${image.src}`);
        }
        if (image.tooltip_right && String(image.tooltip_right["$$typeof"]) !== "Symbol(react.element)"){
            throw new Error(`If you include a right tooltip, it must be a React JSX element. Please fix entry ${image.src}`);
        }
        if (!image.alt) throw new Error(`Image alt is required per NextJS rules, but is missing on ${image.src}`);
    }

    if (targetRowHeightTolerance !== undefined && (targetRowHeightTolerance > 1 || targetRowHeightTolerance < 0
        || typeof targetRowHeightTolerance !== "number")) throw new Error("Target Row Height Tolerance must be a number between 0 and 1.");
    if (containerPadding && containerPadding % 2 !== 0) throw new Error("Container Padding must be an even number.");
    if (targetRowHeight && typeof targetRowHeight !== "number") throw new Error("Target Row Height must be a number.");
    if (targetRowHeight && targetRowHeight < 10) throw new Error("Target Row Height must be a positive number, and greater than 10.");
    if (showIncompleteRows && typeof showIncompleteRows !== "boolean") throw new Error("Show Incomplete Rows must be boolean (true or false)");
    if (maxRows && typeof maxRows !== "number") throw new Error("Max Rows must be a number");
    if (maxRows && maxRows < 1) throw new Error("Max Rows must be 1 or greater.");

    checkPaddingsForErrors(containerPadding, "Container");
    checkPaddingsForErrors(imagePadding?.vertical, "Image Vertical");
    checkPaddingsForErrors(imagePadding?.horizontal, "Image Horizontal");

    function checkPaddingsForErrors(element: string | number | undefined, elementName: string){
        if (element && typeof element !== "number") throw new Error(`${elementName} Padding must be a number.`);
        if (element && typeof element === "number" && element < 0) throw new Error(`${elementName} Padding must be a positive number.`);
    }

    checkForDecimals(maxRows, "Max Rows");
    checkForDecimals(targetRowHeight, "Target Row Height");
    checkForDecimals(imagePadding?.vertical, "Vertical Image Padding");
    checkForDecimals(imagePadding?.horizontal, "Horizontal Image Padding");

    function checkForDecimals(element: string | number | undefined, elementName: string){
        if (element && typeof element === "number" && element % 1 !== 0) throw new Error(`${elementName} must not contain decimals.`);
    }
}