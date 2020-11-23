import { Container } from "./container/Container";
import { PackageHandler } from "./packageModule/PackageHandler";
export declare class Core {
    private readonly _container;
    private _booted;
    constructor(container: Container);
    boot(): boolean;
    get container(): Container;
    get packageHandler(): PackageHandler;
}
export declare const core: Core;
