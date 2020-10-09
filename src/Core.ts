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

    boot(): boolean {
        if (this._booted) {
            return false;
        }

        // Initialize registered packages.
        this._container.get(packageHandlerContainerName).initializesPackages();

        this._booted = true;

        return this._booted;
    }

    get container(): Container {
        return this._container;
    }
}

const _core = new Core(new Container());

export const core = _core;