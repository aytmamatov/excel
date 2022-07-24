import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize, shouldSelect } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { selectHandler } from './table.select';
import { $ } from '@/core/dom';

const KEY_CODES = {
  TAB: 'Tab',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
};

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="1:1"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    const idDataSet = shouldSelect(event);
    const resizeDataSet = shouldResize(event);

    if (resizeDataSet) {
      resizeHandler(this.$root, event);
    }
    if (idDataSet) {
      selectHandler(this.$root, event, this.selection);
    }
  }

  onKeydown(event) {
    const $target = $(event.target);
    const eventCode = event.code;
    const nextElement = $($target.isNextElement());
    if (eventCode === KEY_CODES.TAB && nextElement.exist()) {
      this.selection.select(nextElement);
    }
    if (eventCode === KEY_CODES.ARROW_DOWN) {
      const { row, col } = $target.getId(true);
    }
  }

  toHTML() {
    return createTable();
  }

  destroy() {
    document.onclick = null;
  }
}
