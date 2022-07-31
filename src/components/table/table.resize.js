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

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const $coords = $parent.getCoords();
    const type = $resizer.dataSet.resize;
    const sideProp = type === TABLE.COLUMN ? 'bottom': 'right';

    if (type) $resizer.css({ opacity: 1, [sideProp]: '-5000px' });

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
      document.onmousemove = null;
      document.onmouseup = null;

      if (type ) {
        const { width } = getColumnCoords(e, $coords);
        const { height } = getRowCoords(e, $coords);

        if (type === TABLE.COLUMN) {
          $parent.css({ width });
          $root.findAll(`[data-cell="${$parent.dataSet.cell}"]`)
              .forEach((column) => $(column).css({ width }));
        } else {
          $parent.css({ height });
        }

        resolve({
          value: type === TABLE.COLUMN ? width : height,
          id: type === TABLE.COLUMN ? $parent.dataSet.col : $parent.dataSet.row,
        });

        $resizer.css({ opacity: 0, right: 0, bottom: 0 });
      }
    };
  });
}
