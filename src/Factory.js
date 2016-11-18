import AppError from "./AppError";
import Lifecycle from "./Lifecycle";

export default class Factory {
    static createAppError(...args) {
        return new AppError(...args);
    }
    static createLifecycle(...args) {
        return new Lifecycle(...args);
    }
}
