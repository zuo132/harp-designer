import { createReducer } from '@reduxjs/toolkit';

const initialState = { shape: 'Straight' };

const pillarReducer = createReducer(initialState, {
  UPDATE_PILLAR_SHAPE: (state, { payload }) => {
    return { ...state, shape: payload.shape };
  },
});

export default pillarReducer;
