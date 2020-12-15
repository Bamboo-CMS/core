import {Container} from './container/Container';
import {
  pluginHandlerContainerTags,
  pluginHandlerContainerName,
  PluginHandler
} from './packageModule/PluginHandler';

export class Core {
  private readonly _container: Container;
  private _booted = false;

  constructor(container: Container) {
    this._container = container;

    // Register core required handlers.
    this.container.register(
      new PluginHandler(),
      pluginHandlerContainerName,
      pluginHandlerContainerTags
    );
  }

  boot(): boolean {
    if (this._booted) {
      return false;
    }

    // Initialize registered packages.
    this.pluginHandler.initializesPlugins();

    this._booted = true;

    return this._booted;
  }

  get container(): Container {
    return this._container;
  }

  get pluginHandler(): PluginHandler {
    return this._container.get<PluginHandler>(
      pluginHandlerContainerName
    ) as PluginHandler;
  }
}

export const core = new Core(new Container());
