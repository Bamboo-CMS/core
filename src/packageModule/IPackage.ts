import {IPackageContainer} from "./IPackageContainer";

export interface IPackage {
    /**
     * Function the core trigger if the project get initialized.
     * Register your resolvers, schemas etc. in this method.
     */
    start(packageContainer: IPackageContainer): void;
}