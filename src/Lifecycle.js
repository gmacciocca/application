import Factory from "./Factory";

export default class Lifecycle {
    constructor(delegates, components) {
        this._delegates = delegates;
        this._components = components || [];
        this._dependenciesBuilder = null;
        this._events = null;
        this._uncaughtErrors = null;
    }

    bootstrap() {
        return this._createDelegates()
        .then(() => this._buildDependencies())
        .then(dependenciesRoles => {
            this._events.fireWait("application.ready");
            return dependenciesRoles;
        })
        .catch(err => {
            throw Factory.createAppError("APP.BOOTRSTRAP_ERROR", {
                message: "Application Bootstrap: error.",
                originalError: err
            });
        });
    }

    shutdown() {
        return this._events.fireWait("application.beforeShutdown")
        .then(() => this._shutdownDependencies())
        .then(() => this._events.fireWait("application.shutdown"))
        .catch(err => {
            throw Factory.createAppError("APP.SHUTDOWN_ERROR", {
                message: "Application shutdown: Application Shutdown: error.",
                originalError: err
            });
        });
    }

    _createDelegates() {
        return new Promise((resolve, reject) => {
            try {
                this._dependenciesBuilder = this._delegates.createDependenciesBuilder();
                this._events = this._delegates.createEvents();
                this._uncaughtErrors = this._delegates.createUncaughtErrors();
                this._dependenciesBuilder
                    .addComponent({ roleName: "events", value: this._events })
                    .addComponent({ roleName: "uncaughtErrors", value: this._uncaughtErrors });
                resolve();
            } catch (err) {
                reject(Factory.createAppError("APP.BOOTRSTRAP_ERROR", {
                    message: "Application Bootstrap: error creating delegates.",
                    originalError: err
                }));
            }
        });
    }

    _buildDependencies() {
        this._components.forEach(component => {
            this._dependenciesBuilder.addComponent(component);
        });
        return this._dependenciesBuilder.build()
        .catch(err => {
            throw Factory.createAppError("APP.BOOTRSTRAP_ERROR", {
                message: "Application Bootstrap: error bootstrapping dependencies.",
                originalError: err
            });
        });
    }

    _shutdownDependencies() {
        delete this._dependenciesBuilder;
    }

}
