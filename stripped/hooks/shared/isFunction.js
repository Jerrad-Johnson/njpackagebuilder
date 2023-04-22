// From beautiful-react-hooks.
const isFunction = (functionToCheck) => (typeof functionToCheck === 'function' &&
    !!functionToCheck.constructor &&
    !!functionToCheck.call &&
    !!functionToCheck.apply);
export default isFunction;
