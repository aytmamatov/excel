import { $ } from '@/core/dom';

function range(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1).fill('').map((_, idx) => start + idx);
}

function matrix(target, current) {
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function selectHandler(root, event, selection) {
  const $target = $(event.target);
  if (event.shiftKey) {
    const current = selection.current.getId(true);
    const target = $target.getId(true);
    const cells = matrix(target, current).map((id) => root.find(`[data-id="${id}"]`));
    selection.selectGroup(cells);
  } else {
    selection.select($target);
  }
}
