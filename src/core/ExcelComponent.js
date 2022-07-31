import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options?.listeners);
    this.name = options?.name;
    this.emitter = options.emitter;
    this.store = options.store;
    this.storeSub = null;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  init() {
    this.initDomListeners();
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(action) {
    this.storeSub = this.store.subscribe(action);
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
