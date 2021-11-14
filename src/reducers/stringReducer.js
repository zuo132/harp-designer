import { createReducer } from '@reduxjs/toolkit';
import { stringData } from '../data';

const initialState = { strings: stringData, selectedString: null, stringSpacing: 10 };

const stringReducer = createReducer(initialState, {
  SELECT_STRING: (state, { payload }) => {
    const selectedString = state.strings.find((string) => string.id === payload.stringId);
    return { ...state, selectedString };
  },

  UPDATE_STRING: (state, { payload }) => {
    const stringToUpdate = state.strings.find((string) => string.id === payload.stringId);

    Object.keys(payload.params).forEach((key) => {
      stringToUpdate[key] = payload.params[key];
    });
  },
});

export default stringReducer;
