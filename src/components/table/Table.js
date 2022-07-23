import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@/core/dom';

const TABLE = {
  ROW: 'row',
  COLUMN: 'column',
};

function getRowCoords(e, coords) {
  const delta = e.pageY - coords.bottom;
  const height = coords.height + delta + 'px';
  return { delta, height };
}

function getColumnCoords(e, coords) {
  const delta = e.pageX - coords.right;
  const width = coords.width + delta + 'px';
  return { delta, width };
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
      const type = $resizer.dataSet.resize;
      const sideProp = type === TABLE.COLUMN ? 'bottom': 'right';

      $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

      document.onmousemove = (e) => {
        switch (type) {
          case TABLE.ROW: {
            const { delta } = getRowCoords(e, $coords);
            return $resizer.css({ bottom: -delta + 'px' });
          }
          case TABLE.COLUMN: {
            const { delta } = getColumnCoords(e, $coords);
            return $resizer.css({ right: -delta + 'px' });
          }
          default:
            break;
        }
      };

      document.onmouseup = (e) => {
        $resizer.css({ opacity: 0, right: 0, bottom: 0 });

        if (type === TABLE.COLUMN) {
          const { width } = getColumnCoords(e, $coords);
          $parent.css({ width });
          this.$root.findAll(`[data-cell="${$parent.dataSet.cell}"]`)
              .forEach((column) => $(column).css({ width }));
        } else {
          const { height } = getRowCoords(e, $coords);
          $parent.css({ height });
        }

        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }

  toHTML() {
    return createTable();
  }
}
