function shouldResize(event) {
  return event.target.dataset?.resize;
}

function shouldSelect(event) {
  return event.target.dataset?.id;
}

export {
  shouldResize,
  shouldSelect,
};
