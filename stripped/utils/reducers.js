import { booleanAsString, lightboxReducerCases, lightboxInitialValueCase, lightboxOptions } from "./variables";
const cc = console.log;
export function lightboxOptionsActiveReducer(state, action) {
    switch (action.type) {
        case lightboxReducerCases.tooltip:
            setLocalStorage(state, String(lightboxReducerCases.tooltip));
            return Object.assign(Object.assign({}, state), { tooltip: !state.tooltip });
        case lightboxInitialValueCase:
            return Object.assign({}, setInitialValues(state));
        case lightboxReducerCases.fullscreen:
            setLocalStorage(state, String(lightboxReducerCases.fullscreen));
            return Object.assign(Object.assign({}, state), { fullscreen: !state.fullscreen });
        case lightboxReducerCases.fullscreenDisable:
            return Object.assign(Object.assign({}, state), { fullscreen: false });
        case lightboxReducerCases.shuffle:
            setLocalStorage(state, String(lightboxReducerCases.shuffle));
            if (state.autoplay && !state.shuffle) {
                setLocalStorageEntry(lightboxReducerCases.autoplay, booleanAsString.false);
            }
            return Object.assign(Object.assign({}, state), { shuffle: !state.shuffle, autoplay: false });
        case lightboxReducerCases.shuffleDisable:
            return Object.assign(Object.assign({}, state), { shuffle: false });
        case lightboxReducerCases.autoplay:
            if (state.shuffle && !state.autoplay) {
                setLocalStorageEntry(lightboxReducerCases.shuffle, booleanAsString.false);
            }
            setLocalStorage(state, String(lightboxReducerCases.autoplay));
            return Object.assign(Object.assign({}, state), { autoplay: !state.autoplay, shuffle: false });
        case lightboxReducerCases.autoplayDisable:
            return Object.assign(Object.assign({}, state), { autoplay: false });
        case lightboxReducerCases.curtain:
            setLocalStorage(state, String(lightboxReducerCases.curtain));
            return Object.assign(Object.assign({}, state), { curtain: !state.curtain });
        default:
            return Object.assign({}, state);
    }
}
function setLocalStorage(state, dataSelector) {
    localStorage.setItem(dataSelector, String(!state[dataSelector]));
}
function setInitialValues(state) {
    let stateCopy = Object.assign({}, state);
    for (let entry in lightboxOptions) {
        if (localStorage.getItem(entry) === booleanAsString.true) {
            stateCopy[entry] = true;
        }
        else if (localStorage.getItem(entry) === booleanAsString.false) {
            stateCopy[entry] = false;
        }
        else if (localStorage.getItem(entry) === null) {
            localStorage.setItem(entry, String(stateCopy[entry]));
        }
    }
    return stateCopy;
}
function setLocalStorageEntry(item, bool) {
    localStorage.setItem(item, String(bool));
}
