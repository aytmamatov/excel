import { KEY_CODES } from '@/config';

function shouldResize(event) {
  return event.target.dataset?.resize;
}

function shouldSelect(event) {
  return event.target.dataset?.id;
}

function getNextSelector(key, id) {
  let { col, row } = id;
  switch (key) {
    case KEY_CODES.TAB:
    case KEY_CODES.ARROW_RIGHT:
      col++;
      break;
    case KEY_CODES.ENTER:
    case KEY_CODES.ARROW_DOWN:
      row++;
      break;
    case KEY_CODES.ARROW_UP:
      row--;
      break;
    case KEY_CODES.ARROW_LEFT:
      col--;
      break;
    default:
      break;
  }
  return `[data-id="${row}:${col}"]`;
}

export {
  shouldResize,
  shouldSelect,
  getNextSelector,
};
