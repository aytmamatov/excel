import { ExcelComponent } from '@/core/ExcelComponent';
import { $ } from '@core/dom';

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
    if (event.key === 'Enter') {
      event.preventDefault();
      this.$emit('formula:focus');
    }
  }
}
