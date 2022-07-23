import { $ } from '@/core/dom';

export function selectHandler($root, id, selection) {
  const previosCells = $root.findAll('.selected');
  previosCells.forEach((previosCell) => $(previosCell).removeClass('selected'));
  const $cell = $root.find(`[data-id="${id}"]`);
  selection.select($cell);
}

