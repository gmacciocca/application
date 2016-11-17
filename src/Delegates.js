import AppError from "./AppError";

export default class Delegates {
    constructor(externalDelegates) {
        Object.assign(this, externalDelegates);
    }
    createEvents() {
        throw new AppError("APP.MISSING_DELEGATE", { message: "Events delegate is required." });
    }
    createUncaughtErrors() {
        throw new AppError("APP.MISSING_DELEGATE", { message: "UncaughtErrors delegate is required." });
    }
    createDependenciesBuilder() {
        throw new AppError("APP.MISSING_DELEGATE", { message: "DependenciesBuilder delegate is required." });
    }
}
