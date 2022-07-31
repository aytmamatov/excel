const ACTIONS = {
  TABLE_RESIZE: 'TABLE_RESIZE',
};

function rootReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.TABLE_RESIZE: {
      const { id, value } = payload;
      const prevState = state.colsState || {};
      prevState[id] = value;
      return {
        ...state,
        colsState: prevState,
      };
    }
    default:
      return state;
  }
}

export {
  ACTIONS,
  rootReducer,
};
