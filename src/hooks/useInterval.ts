import { useCallback, useEffect, useRef, useState } from 'react';
import isFunction from './shared/isFunction';
// From beautiful-react-hooks. Modified to include a reset feature.

const defaultOptions = {
    cancelOnUnmount: true
};

const useInterval = (fn: () => any, milliseconds: number | null, options = defaultOptions) => {
    const opts = Object.assign(Object.assign({}, defaultOptions), (options || {}));
    const timeout = useRef();
    const callback = useRef(fn);
    const [isCleared, setIsCleared] = useState(false); // Can be returned, but I removed it.
    const [isReset, setReset] = useState(false);

    const clear = useCallback(() => {
        if (timeout.current) {
            setIsCleared(true);
            clearInterval(timeout.current);
        }
    }, []);

    useEffect(() => {
        if (isFunction(fn)) {
            callback.current = fn;
        }
    }, [fn]);

    useEffect(() => {
        if (isReset) {
            clear();
            setReset(false);
        }
    }, [isReset])

    useEffect(() => {
        if (typeof milliseconds === 'number') { //@ts-ignore
            timeout.current = setInterval(() => {
                callback.current();
            }, milliseconds);
        }
        return clear;
    }, [milliseconds, isReset]);

    useEffect(() => () => {
        if (opts.cancelOnUnmount) {
            clear();
        }
    }, []);
    return [setReset];
};
export default useInterval;
