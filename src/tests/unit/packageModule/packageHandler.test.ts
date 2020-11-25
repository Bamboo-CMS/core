import {core} from "../../../Core";
import {PluginMock} from "../../mock/PluginMock";

describe('Package handler tests', () => {
    it('should register a package', async () => {
        const packageHandler = core.packageHandler;
        const pluginMock = new PluginMock();

        packageHandler.registerPackage(pluginMock, Symbol('test'));

        expect(packageHandler.packages).toBeInstanceOf(Array);
        expect(packageHandler.packages.length).toBe(1);
        expect(packageHandler.packages[0]).toBe(pluginMock);
    });
});