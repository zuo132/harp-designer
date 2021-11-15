import { createAction } from '@reduxjs/toolkit';

export const updatePillarShape = (shape) => async (dispatch) => {
  dispatch(createAction('UPDATE_PILLAR_SHAPE')({ shape }));
};
