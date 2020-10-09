import {Container} from "./container/Container";
import {ResolverContainer} from "./resolverModule/ResolverContainer";
import {PackageContainer} from "./packageModule/PackageContainer";

class Core {
    private readonly _container: Container;
    private _booted: boolean = false;

    constructor(container: Container) {
        this._container = container;

        // Register core required containers.
        this.container.register(new ResolverContainer(), ResolverContainer.getName(), ['container']);
        this.container.register(new PackageContainer(), PackageContainer.getName(), ['container']);
    }

    boot() {
        if (this._booted) {
            return;
        }

        this._booted = true;

        // Initialize registered packages.
        this._container.get(ResolverContainer.getName()).initializesPackages();

        //
    }

    get container(): Container {
        return this._container;
    }
}

const _core = new Core(new Container());

export const core = _core;