import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@/core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="1:1"]');
    this.selection.select($cell);

    document.onclick = (e) => {
      const idDataSet = $(e.target).dataSet.id;
      if (idDataSet) {
        const previosCells = this.$root.findAll('.selected');
        previosCells.forEach((previosCell) => $(previosCell).removeClass('selected'));
        const $cell = this.$root.find(`[data-id="${idDataSet}"]`);
        this.selection.select($cell);
      }
    };
  }


  onMousedown(event) {
    if (shouldResize) {
      resizeHandler(this.$root, event);
    }
  }

  toHTML() {
    return createTable();
  }

  destroy() {
    document.onclick = null;
  }
}
