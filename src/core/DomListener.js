import { capitalize } from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in the ${this.name} component`);
      }
      this.$root.on(listener, this[method]?.bind(this));
    });
  }

  removeDomListeners() {

  }
}

function getMethodName(listener) {
  return `on${capitalize(listener)}`;
}
