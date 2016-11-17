import HError from "honest-error";

const CODES = [
    "APP.ALREADY_INSTANTIATED",
    "APP.NOT_INSTANTIATED",
    "APP.BOOTRSTRAP_ERROR",
    "APP.SHUTDOWN_ERROR",
    "APP.MISSING_DELEGATE"
];

export default class AppError extends HError {
    constructor(...args) {
        super(...args);
        this.setCodes(CODES);
    }
}
