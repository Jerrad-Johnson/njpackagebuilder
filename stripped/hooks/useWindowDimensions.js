import { useEffect, useState } from "react";
export function useWindowDimensions() {
    const [windowHeight, setWindowHeight] = useState(1080);
    const [windowWidth, setWindowWidth] = useState(1920);
    useEffect(() => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        });
        return () => {
            window.removeEventListener('resize', () => {
                setWindowHeight(window.innerHeight);
                setWindowWidth(window.innerWidth);
            });
        };
    }, []);
    return [windowHeight, windowWidth];
}
