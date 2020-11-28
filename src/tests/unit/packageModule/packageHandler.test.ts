import {core} from "../../../Core";
import {PluginMock} from "../../mock/PluginMock";

describe('Package handler tests', () => {
    it('should register a package', async () => {
        const packageHandler = core.pluginHandler;
        const pluginMock = new PluginMock();

        packageHandler.registerPlugin(pluginMock, Symbol('test'));

        expect(packageHandler.plugins).toBeInstanceOf(Array);
        expect(packageHandler.plugins.length).toBe(1);
        expect(packageHandler.plugins[0]).toBe(pluginMock);
    });
});