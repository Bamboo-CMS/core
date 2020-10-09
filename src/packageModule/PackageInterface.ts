export interface PackageInterface {
    /**
     * Function the core trigger if the project get initialized.
     * Register your resolvers, schemas etc. in this method.
     */
    start(): void;
}