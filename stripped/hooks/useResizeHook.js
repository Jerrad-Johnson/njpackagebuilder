import { useEffect } from "react";
import createGalleryLayout from "../utils/galleryLayout";
function useResizeHook(setImageElements, galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened) {
    const listener = () => {
        setImageElements(createGalleryLayout(galleryInputsWithDefaults, galleryElementRef, setLightboxState, setLightboxEverOpened));
    };
    useEffect(() => {
        window.addEventListener('resize', listener);
        return () => { window.removeEventListener('resize', listener); };
    }, []);
}
export default useResizeHook;
