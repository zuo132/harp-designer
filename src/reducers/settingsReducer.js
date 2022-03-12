import { createReducer } from '@reduxjs/toolkit';

const initialState = { backgroundColor: 'burlywood' };

const settingsReducer = createReducer(initialState, {
  UPDATE_BACKGROUND_COLOR: (state, { payload }) => {
    return { ...state, backgroundColor: payload.color };
  },
});

export default settingsReducer;
