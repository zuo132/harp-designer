import { createReducer } from '@reduxjs/toolkit';

const initialState = { neckThickness: 40, tuningPinLength: 20 };

const neckReducer = createReducer(initialState, {
  UPDATE_NECK_THICKNESS: (state, { payload }) => {
    return { ...state, neckThickness: payload.thickness };
  },

  UPDATE_TUNING_PIN_LENGTH: (state, { payload }) => {
    return { ...state, tuningPinLength: payload.length };
  },
});

export default neckReducer;
