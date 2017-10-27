declare namespace Electron {
    interface AutoUpdater extends EventEmitter {

        addListener(event: string, listener: Function): this;
    }
}
