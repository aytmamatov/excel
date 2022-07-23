import { $ } from '@/core/dom';

export function selectHandler(event, selection) {
  selection.select($(event.target));
}

