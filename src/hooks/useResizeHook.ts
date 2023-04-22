import {Dispatch, ReactElement, SetStateAction, useEffect} from "react";
import {GalleryElemRef, GalleryInputsWithDefaults} from "../types/njGallery";
import createGalleryLayout from "../utils/galleryLayout";

function useResizeHook(setImageElements: Dispatch<SetStateAction<ReactElement[] | null>>,
                       galleryInputsWithDefaults: GalleryInputsWithDefaults,
                       galleryElementRef: GalleryElemRef,
                       setLightboxState: Dispatch<SetStateAction<number | null>>,
                       setLightboxEverOpened: Dispatch<SetStateAction<boolean>>,
                       ): void{

    const listener = () => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState,
            setLightboxEverOpened));
    }

    useEffect(() => {
        window.addEventListener('resize', listener);
        return () => { window.removeEventListener('resize', listener); }
    }, []);
}

export default useResizeHook;