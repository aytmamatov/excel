import { $ } from '@/core/dom';

export function selectHandler($root, event, selection) {
  const previosCells = $root.findAll('.selected');
  previosCells.forEach((previosCell) => $(previosCell).removeClass('selected'));
  selection.select($(event.target));
}

