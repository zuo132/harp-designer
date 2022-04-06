import { createReducer } from '@reduxjs/toolkit';

const initialState = { angle: 45, control: null, stringBandThickness: 20, length: 0 };

const soundboardReducer = createReducer(initialState, {
  UPDATE_SOUNDBOARD_ANGLE: (state, { payload }) => {
    return { ...state, angle: payload.angle };
  },

  UPDATE_CONTROL_POSITION: (state, { payload }) => {
    return { ...state, control: payload.position };
  },

  UPDATE_STRING_BAND_THICKNESS: (state, { payload }) => {
    return { ...state, stringBandThickness: payload.thickness };
  },

  UPDATE_SOUNDBOARD_LENGTH: (state, { payload }) => {
    return { ...state, length: payload.length };
  },

  UPDATE_SOUNDBOARD_STATE: (state, { payload }) => {
    return { ...payload.state };
  },
});

export default soundboardReducer;
