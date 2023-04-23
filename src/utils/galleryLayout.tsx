import Image from "next/legacy/image";
import {
    GalleryElemRef,
    GalleryInputsWithDefaults,
    GalleryLayoutData,
    ImageData, ReformattedGalleryLayout
} from "../types/njGallery";
import {Dispatch, ReactElement, SetStateAction} from "react";
const layoutGeometry = require('../justified-layout');
import {handleLightbox} from "./lightbox";
const cc = console.log;

function createGalleryLayout(galleryInputsWithDefaults: GalleryInputsWithDefaults,
                             galleryElementRef: GalleryElemRef,
                             setLightboxState: Dispatch<SetStateAction<number | null>>,
                             setLightboxEverOpened: Dispatch<SetStateAction<boolean>>,
                             prevElements: ReactElement[] | null = null,
                             ): ReactElement[]{

    const galleryInputsWithDefaultsCopy: GalleryInputsWithDefaults = {...galleryInputsWithDefaults}
    const {images, imagePadding} = galleryInputsWithDefaultsCopy;
    const galleryLayout = calculateGalleryLayout(galleryInputsWithDefaultsCopy, galleryElementRef);
    const reformattedGalleryLayout = reformatGalleryData(galleryLayout, images);
    const galleryElems = reformattedGalleryLayout.map((e) => {
        const boxHeight = Math.trunc(+e.boxHeight);
        const boxWidth = Math.trunc(+e.boxWidth);
        const imgBlurSrc = e.imgBlurSrc ? "blur" : undefined;
        let ratio = +(e.boxHeight / e.boxWidth).toFixed(3);

        return (
            <div
                style={{ "margin": (imagePadding.vertical/2) + "px " + (imagePadding.horizontal/2) + "px "
                        + (imagePadding.vertical/2) + "px " + (imagePadding.horizontal/2) + "px", }}
                key={e.imgSrc}
            >
                <Image
                    key={e.imgSrc}
                    src={e.imgSrc}
                    onClick={((event) => {
                        event.stopPropagation();
                        handleLightbox(event, galleryInputsWithDefaults, setLightboxState, setLightboxEverOpened);
                    })}
                    data-ratio={ratio}
                    data-largeimg={e.lg_img_url}
                    blurDataURL={e.imgBlurSrc}
                    placeholder={imgBlurSrc}
                    className={"njGalleryImage"}
                    width={boxWidth}
                    height={boxHeight}
                    alt={e.alt}
                    style={{cursor: "pointer"}}
                />
            </div>
        );
    });

    if (galleryElems.length > 0) return galleryElems; // This hopefully solves cases when stretching the browser window, and doing other unknown actions, causes the gallery to permanently disappear.
    // @ts-ignore
    return prevElements;
}

function calculateGalleryLayout(galleryInputsWithDefaultsCopy: GalleryInputsWithDefaults,
                                galleryElementRef: GalleryElemRef
                                ): GalleryLayoutData{
    const {images, containerPadding, targetRowHeight, imagePadding, maxRows, showIncompleteRows,
        targetRowHeightTolerance} = galleryInputsWithDefaultsCopy;
    const imagesDimensions = images.map((e) => { return {width: e.width, height: e.height} });
    let galleryContainerWidth = galleryElementRef?.current?.offsetWidth
        ? galleryElementRef?.current?.offsetWidth-4 : 14; // -4 because otherwise at some widths, the last image in a row jumps to the next row. Total width might be e.g. 0.42 pixels too large.
    if ((galleryContainerWidth - containerPadding) < 14) galleryContainerWidth = 14 + containerPadding;
    const galleryContainerCalculatedWidth = Math.trunc(galleryContainerWidth);

    return layoutGeometry(imagesDimensions, {
            containerWidth: galleryContainerCalculatedWidth,
            targetRowHeight: targetRowHeight || 300,
            containerPadding: containerPadding,
            boxSpacing: imagePadding,
            maxNumRows: maxRows,
            showWidows: showIncompleteRows,
            targetRowHeightTolerance: targetRowHeightTolerance,
            edgeCaseMinRowHeight: 80,
        }
    );
}

function reformatGalleryData(galleryLayout: GalleryLayoutData, images: ImageData[]): ReformattedGalleryLayout[] | []{
    const imagesCopy = [...images];
    let reformattedGalleryLayout = [];

    for (let i = 0; i < galleryLayout.boxes.length; i++){//@ts-ignore
        reformattedGalleryLayout[i] = {} as ReformattedGalleryLayout;//@ts-ignore
        reformattedGalleryLayout[i].boxHeight = galleryLayout.boxes[i].height;//@ts-ignore
        reformattedGalleryLayout[i].boxWidth = galleryLayout.boxes[i].width;//@ts-ignore
        reformattedGalleryLayout[i].imgSrc = imagesCopy[i].src;//@ts-ignore
        reformattedGalleryLayout[i].imgBlurSrc = imagesCopy[i].blurSrc;//@ts-ignore
        reformattedGalleryLayout[i].alt = imagesCopy[i].alt;//@ts-ignore//@ts-ignore
        reformattedGalleryLayout[i].lg_img_url = imagesCopy[i].lg_img_url;
    }

    return reformattedGalleryLayout;
}

export default createGalleryLayout;
