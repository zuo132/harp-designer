import { createReducer } from '@reduxjs/toolkit';

const initialState = { neckThickness: 40 };

const neckReducer = createReducer(initialState, {
  UPDATE_NECK_THICKNESS: (state, { payload }) => {
    return { ...state, neckThickness: payload.thickness };
  },
});

export default neckReducer;
