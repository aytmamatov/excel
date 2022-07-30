const KEY_CODES = {
  TAB: 'Tab',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ENTER: 'Enter',
};

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
  KEY_CODES,
  shouldResize,
  shouldSelect,
  getNextSelector,
};
