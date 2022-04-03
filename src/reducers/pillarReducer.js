import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  shape: 'Straight',
  pillarDiameter: 30,
  pillarWidth: 40,
  pillarThickness: 20,
  neckJointWidth: 2,
};

const pillarReducer = createReducer(initialState, {
  UPDATE_PILLAR_SHAPE: (state, { payload }) => {
    return { ...state, shape: payload.shape };
  },

  UPDATE_PILLAR_DIAMETER: (state, { payload }) => {
    return { ...state, pillarDiameter: payload.diameter };
  },

  UPDATE_PILLAR_WIDTH: (state, { payload }) => {
    return { ...state, pillarWidth: payload.width };
  },

  UPDATE_PILLAR_THICKNESS: (state, { payload }) => {
    return { ...state, pillarThickness: payload.thickness };
  },

  UPDATE_NECK_JOINT_WIDTH: (state, { payload }) => {
    return { ...state, neckJointWidth: payload.width };
  },

  UPDATE_PILLAR_STATE: (state, { payload }) => {
    return { ...payload.state };
  },
});

export default pillarReducer;
