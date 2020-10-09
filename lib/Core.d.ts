import { Container } from "./container/Container";
declare class Core {
    private readonly _container;
    private _booted;
    constructor(container: Container);
    boot(): void;
    get container(): Container;
}
export declare const core: Core;
export {};
