import {core} from '../../Core';
import {Container} from '../../container/Container';
import {
  PluginHandler,
  pluginHandlerContainerName,
  pluginHandlerContainerTags
} from '../..';

describe('Core tests', () => {
  it('should instance the core correctly', async () => {
    expect(core.container).toBeInstanceOf(Container);
    expect(core.container.get(pluginHandlerContainerName)).toBeInstanceOf(PluginHandler);
    expect(core.container.getByTags(pluginHandlerContainerTags).length).toBe(1);
    expect(core.container.getByTags(pluginHandlerContainerTags)[0]).toBeInstanceOf(
      PluginHandler
    );
  });

  it('should boot the core correctly', async () => {
    expect(core.boot()).toBe(true);

    // Do not boot twice.
    expect(core.boot()).toBe(false);
  });
});
