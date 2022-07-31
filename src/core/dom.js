class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string' ) {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string' ) {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  get dataSet() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  addClass(className) {
    return this.$el.classList.add(className);
  }

  removeClass(className) {
    return this.$el.classList.remove(className);
  }

  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => this.$el.style[key] = value);
  }

  getId(parse) {
    const currentId = this.$el.dataset.id;
    if (parse) {
      const [row, col] = currentId.split(':');
      return { row: +row, col: +col };
    }
    return currentId;
  }

  isNextElement() {
    return this.$el.nextElementSibling;
  }

  exist() {
    return this.$el;
  }

  focus() {
    this.$el.focus();
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
