import { createReducer } from '@reduxjs/toolkit';

const initialState = { angle: 50, control: null };

const soundboardReducer = createReducer(initialState, {
  UPDATE_SOUNDBOARD_ANGLE: (state, { payload }) => {
    return { ...state, angle: payload.angle };
  },

  UPDATE_CONTROL_POSITION: (state, { payload }) => {
    return { ...state, control: payload.position };
  },
});

export default soundboardReducer;
