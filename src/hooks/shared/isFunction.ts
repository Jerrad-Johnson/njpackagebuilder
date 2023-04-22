// From beautiful-react-hooks.

const isFunction = (functionToCheck: () => any) => (typeof functionToCheck === 'function' &&
    !!functionToCheck.constructor &&
    !!functionToCheck.call &&
    !!functionToCheck.apply);

export default isFunction;
