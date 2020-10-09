import {Container} from "./container/Container";
import {packageHandlerContainerTags, packageHandlerContainerName, PackageHandler} from "./packageModule/PackageHandler";

class Core {
    private readonly _container: Container;
    private _booted: boolean = false;

    constructor(container: Container) {
        this._container = container;

        // Register core required handlers.
        this.container.register(new PackageHandler(), packageHandlerContainerName, packageHandlerContainerTags);
    }

    boot() {
        if (this._booted) {
            return;
        }

        // Initialize registered packages.
        this._container.get(packageHandlerContainerName).initializesPackages();

        this._booted = true;
    }

    get container(): Container {
        return this._container;
    }
}

const _core = new Core(new Container());

export const core = _core;