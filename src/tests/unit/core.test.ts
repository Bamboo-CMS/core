import {core} from "../../Core";
import {Container} from "../../container/Container";
import {
    PackageHandler,
    packageHandlerContainerName,
    packageHandlerContainerTags
} from "../../packageModule/PackageHandler";

describe('Core tests', () => {
    it('should instance the core correctly', async () => {
        expect(core.container).toBeInstanceOf(Container);
        expect(core.container.get(packageHandlerContainerName)).toBeInstanceOf(PackageHandler);
        expect(core.container.getByTags(packageHandlerContainerTags).length).toBe(1);
        expect(core.container.getByTags(packageHandlerContainerTags)[0]).toBeInstanceOf(PackageHandler);
    });

    it('should boot the core correctly', async () => {
        expect(core.boot()).toBe(true);

        // Do not boot twice.
        expect(core.boot()).toBe(false);
    });
});