import { Container } from "./container/Container";
import { PackageHandler } from "./packageModule/PackageHandler";
declare class Core {
    private readonly _container;
    private _booted;
    constructor(container: Container);
    boot(): boolean;
    get container(): Container;
    get pageHandler(): PackageHandler | null;
}
export declare const core: Core;
export {};
