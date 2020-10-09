import { IPackageContainer } from "./IPackageContainer";
export interface IPackage {
    start(packageContainer: IPackageContainer): void;
}
