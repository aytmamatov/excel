import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  shouldResize, shouldSelect, getNextSelector,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { selectHandler } from './table.select';
import { $ } from '@/core/dom';
import { KEY_CODES } from '@/config';

const DEFAULT_CELL = '[data-id="1:1"]';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find(DEFAULT_CELL);
    this.selectCell($cell);

    this.$on('formula:text', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:focus', () => {
      this.selection.current.focus();
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.$emit('table:keydown', cell.text());
  }

  onMousedown(event) {
    const idDataSet = shouldSelect(event);
    const resizeDataSet = shouldResize(event);

    this.$emit('table:click', $(event.target).text());

    if (resizeDataSet) {
      resizeHandler(this.$root, event);
    }
    if (idDataSet) {
      selectHandler(this.$root, event, this.selection);
    }
  }

  onKeydown(event) {
    const eventKey = event.key;
    const keys = Object.values(KEY_CODES);

    if (keys.includes(eventKey) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.getId(true);
      const nextSelector = getNextSelector(eventKey, id);
      const $cell = this.$root.find(nextSelector);

      if ($cell.exist()) {
        this.selectCell($cell);
      }
    }
  }

  onInput(event) {
    this.selectCell($(event.target));
  }

  toHTML() {
    return createTable();
  }

  destroy() {
    document.onclick = null;
  }
}
