import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@/core/dom';

const TABLE = {
  ROW: 'row',
  COLUMN: 'column',
};

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup'],
    });
  }

  onMousedown(event) {
    if (event.target.dataset?.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const $coords = $parent.getCoords();
      const dataCell = $parent.dataSet.cell;
      const columns = this.$root.findAll(`[data-cell="${dataCell}"]`);

      document.onmousemove = (e) => {
        switch ($resizer.dataSet.resize) {
          case TABLE.ROW: {
            const delta = e.pageY - $coords.bottom;
            const value = $coords.height + delta;
            $parent.css({ height: value + 'px' });
            break;
          }
          case TABLE.COLUMN: {
            const delta = e.pageX - $coords.right;
            const value = $coords.width + delta;

            columns.forEach((column) => {
              $(column).css({ width: value + 'px' });
            });

            $parent.css({ width: value + 'px' });
            break;
          }
          default:
            break;
        }
      };

      document.onmouseup = ( ) => document.onmousemove = null;
    }
  }

  onMouseup() {}

  toHTML() {
    return createTable();
  }
}
