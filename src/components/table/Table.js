import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  init() {
    super.init();

    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="1:1"]');
    this.selection.select($cell);
  }

  prepare() {}

  onMousedown(event) {
    if (shouldResize) {
      resizeHandler(this.$root, event);
    }
  }

  toHTML() {
    return createTable();
  }
}
