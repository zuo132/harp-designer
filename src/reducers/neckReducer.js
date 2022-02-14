import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  neckThickness: 40,
  tuningPinLength: 20,
  frontNeckThickness: 15,
  backNeckThickness: 15,
  frontNeckTuningPostLength: 10,
  backNeckTuningPostLength: 10,
};

const neckReducer = createReducer(initialState, {
  UPDATE_NECK_THICKNESS: (state, { payload }) => {
    return { ...state, neckThickness: payload.thickness };
  },

  UPDATE_TUNING_PIN_LENGTH: (state, { payload }) => {
    return { ...state, tuningPinLength: payload.length };
  },

  UPDATE_PARAGUAYAN_PARAMS: (state, { payload }) => {
    Object.keys(payload.params).forEach((key) => {
      state[key] = payload.params[key];
    });
  },
});

export default neckReducer;
