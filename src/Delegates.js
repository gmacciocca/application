import Factory from "./Factory";

export default class Delegates {
    constructor(externalDelegates) {
        Object.assign(this, externalDelegates);
    }
    createEvents() {
        throw Factory.createAppError("APP.MISSING_DELEGATE", { message: "Events delegate is required." });
    }
    createUncaughtErrors() {
        throw Factory.createAppError("APP.MISSING_DELEGATE", { message: "UncaughtErrors delegate is required." });
    }
    createDependenciesBuilder() {
        throw Factory.createAppError("APP.MISSING_DELEGATE", { message: "DependenciesBuilder delegate is required." });
    }
}
