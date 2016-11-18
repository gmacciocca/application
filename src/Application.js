import Factory from "./Factory";

let _instance;

export default class Application {
    constructor(delegates, components, configuration) {
        if (_instance) {
            throw Factory.createAppError("APP.ALREADY_INSTANTIATED", {
                message: "Application constructor: App is already instantiated."
            });
        }
        _instance = this;
        this._configuration = configuration;
        this._lifecycle = Factory.createLifecycle(delegates, components);
        this._localize = null;
        this._storage = null;
        this._dependenciesRoles = null;
    }

    bootstrap() {
        return this._lifecycle.bootstrap()
            .then(dependenciesRoles => {
                this._dependenciesRoles = dependenciesRoles;
                this._localize = this._dependenciesRoles.localize;
                this._storage = this._dependenciesRoles.storage;
            });
    }

    shutdown() {
        return this._lifecycle.shutdown();
    }

    destroy() {
        _instance = null;
    }

    localize(...args) {
        return this._localize.localize(...args);
    }

    get stores() {
        return this._storage ? this._storage.stores : {};
    }

    get configuration() {
        return this._configuration;
    }

    get roles() {
        return this._dependenciesRoles;
    }

    static create(...args) {
        return new Application(...args);
    }

    static get hasInstance() {
        return !!_instance;
    }

    static instance() {
        if (!_instance) {
            throw Factory.createAppError("APP.NOT_INSTANTIATED", {
                message: "Application instance: App is not instantiated."
            });
        }
        return _instance;
    }

    static bootstrap(...args) {
        return Application.instance().bootstrap(...args);
    }

    static shutdown(...args) {
        return Application.instance().shutdown(...args);
    }

    static destroy(...args) {
        return Application.instance().destroy(...args);
    }

    static localize(...args) {
        return Application.instance().localize(...args);
    }

    static get stores() {
        return Application.instance().stores;
    }

    static get roles() {
        return Application.instance().roles;
    }

    static get configuration() {
        return Application.instance().configuration();
    }
}
