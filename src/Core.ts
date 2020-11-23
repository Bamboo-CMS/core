import {Container} from "./container/Container";
import {packageHandlerContainerTags, packageHandlerContainerName, PackageHandler} from "./packageModule/PackageHandler";

export class Core {
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
        this._container.get<PackageHandler>(packageHandlerContainerName)?.initializesPackages();

        this._booted = true;

        return this._booted;
    }

    get container(): Container {
        return this._container;
    }

    get packageHandler(): PackageHandler {
        return this._container.get<PackageHandler>(packageHandlerContainerName) as PackageHandler;
    }
}

export const core = new Core(new Container());