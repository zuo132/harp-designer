import { createReducer } from '@reduxjs/toolkit';
import { stringData } from '../data';

const initialState = { strings: stringData, selectedString: null };

const stringReducer = createReducer(initialState, {
  SELECT_STRING: (state, { payload }) => {
    const selectedString = state.strings.filter((string) => string.id === payload.stringId);

    return { ...state, selectedString };
  },

  UPDATE_STRING: (state, { payload }) => {
    const updatedStrings = state.strings.map((string) => {
      if (string.id !== payload.stringId) return string;

      return { ...string, ...payload.params };
    });

    return { ...state, strings: updatedStrings };
  },
});

export default stringReducer;
