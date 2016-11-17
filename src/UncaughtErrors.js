
export default class UncaughtErrors {
    constructor() {
        this._listen();
    }

    _listen() {
        global.addEventListener("error", (...args) => {
            console.error("UNCAUGHT ERRORS: global ", ...args); // eslint-disable-line no-console
            return true;
        });
        window.addEventListener("error", (...args) => {
            console.error("UNCAUGHT ERRORS: window", ...args); // eslint-disable-line no-console
            return true;
        });
    }
}
