const CODES = {
  A: 65,
  Z: 90,
};

function createCell(content = '', dataCell = '') {
  return `<div class="cell" contenteditable data-cell="${dataCell}">${content}</div>`;
}

function createColumn(content = '', idx = '') {
  return `<div class="column" data-type="resizable" data-cell="${content}${idx}">
    ${content}
    <div class="column--resize" data-resize="column"></div>
  </div>`;
}

function createRow(content, number = '') {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${number}
        ${number && '<div class="row--resize" data-resize="row"></div>'}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `;
}

function toChar(idx) {
  return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const emptyCols = new Array(colsCount).fill('');
  const cols = emptyCols.map((_, idx) => createColumn(toChar(idx), idx + 1)).join('');
  const cells = emptyCols.map((_, idx) => {
    const currentIdx = idx + 1;
    const dataCell = `${toChar(idx)}${currentIdx}`;
    return createCell(currentIdx, dataCell);
  }).join('');
  const rows = [];

  rows.push(createRow(cols));
  for (let index = 1; index <= rowsCount; index++) {
    rows.push(createRow(cells, index));
  }

  return rows.join('');
}
