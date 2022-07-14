export class DomListener {
  constructor($root, options) {
    if (!$root) {
      throw new Error('No $root provided');
    }
    this.$root = $root;
    this.options = options;
  }

  initDomListeners() {

  }

  removeDomListeners() {

  }
}
