import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@/core/dom';

const TABLE = {
  ROW: 'row',
  COLUMN: 'column',
};

function getRowCoords(e, coords) {
  const delta = e.pageY - coords.bottom;
  return coords.height + delta + 'px';
}

function getColumnCoords(e, coords) {
  const delta = e.pageX - coords.right;
  return coords.width + delta + 'px';
}

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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
            return $parent.css({ height: getRowCoords(e, $coords) });
          }
          case TABLE.COLUMN: {
            return $parent.css({ width: getColumnCoords(e, $coords) });
          }
          default:
            break;
        }
      };

      document.onmouseup = (e) => {
        const width = getColumnCoords(e, $coords);

        columns.forEach((column) => {
          $(column).css({ width });
        });

        document.onmousemove = null;
      };
    }
  }

  toHTML() {
    return createTable();
  }
}
