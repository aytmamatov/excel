import { ExcelComponent } from '@/core/ExcelComponent';
import { $ } from '@core/dom';
import { KEY_CODES } from '@/config';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    const toolbarInput = this.$root.find('.input');

    this.$on('table:keydown', (text) => {
      toolbarInput.text(text);
    });
    this.$on('table:click', (text) => {
      toolbarInput.text(text);
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    this.$emit('formula:text', $(event.target).text());
  }

  onKeydown(event ) {
    const KEYS = [KEY_CODES.ENTER, KEY_CODES.TAB];
    if (KEYS.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:focus');
    }
  }
}
